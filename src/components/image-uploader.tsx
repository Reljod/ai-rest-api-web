"use client";
import React from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useDropzone } from "react-dropzone";
import { z } from "zod";
import { Input } from "./ui/input";
import { Form, FormControl, FormField, FormItem, FormLabel } from "./ui/form";
import Image from "next/image";
import { Button } from "./ui/button";

export const ImageUploader: React.FC = () => {
  const [preview, setPreview] = React.useState<string | ArrayBuffer | null>(
    null
  );

  const formSchema = z.object({
    image: z
      .instanceof(File)
      .refine((file) => file.size !== 0, "Please upload an image"),
  });

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    mode: "onBlur",
    defaultValues: {
      image: new File([""], "filename"),
    },
  });

  const onDrop = React.useCallback(
    (acceptedFiles: File[]) => {
      const reader = new FileReader();
      try {
        reader.onload = () => setPreview(reader.result);
        reader.readAsDataURL(acceptedFiles[0]);
        form.setValue("image", acceptedFiles[0]);
        form.clearErrors("image");
      } catch (error) {
        setPreview(null);
        form.resetField("image");
      }
    },
    [form]
  );

  const { getRootProps, getInputProps, isDragActive, fileRejections } =
    useDropzone({
      onDrop,
      maxFiles: 1,
      maxSize: 1000000,
      accept: { "image/png": [], "image/jpg": [], "image/jpeg": [] },
    });

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      const formData = new FormData();
      formData.append("image", values.image);
      const response = await fetch("/api/analyze", {
        method: "POST",
        body: formData,
      });
      const result = await response.text();
      console.log(result);
    } catch (error) {
      console.error("Upload failed:", error);
    }
  };

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="space-y-4 w-full flex flex-col justify-center"
      >
        <FormField
          control={form.control}
          name="image"
          render={() => (
            <FormItem>
              <FormControl className="flex flex-col items-center">
                <div>
                  <div
                    {...getRootProps()}
                    className="relative aspect-square w-full lg:w-2/3 flex items-center justify-center bg-gray-200 rounded-sm"
                  >
                    {preview ? (
                      <Image
                        src={preview as string}
                        alt="Uploaded image"
                        className="rounded-lg object-contain"
                        fill
                      />
                    ) : (
                      <p className="text-gray-500 text-xs">
                        Click here or drag an image to upload it
                      </p>
                    )}
                  </div>
                  <Input {...getInputProps()} type="file" />
                </div>
              </FormControl>
            </FormItem>
          )}
        />
        <Button
          type="submit"
          className="px-8 py-4"
          disabled={preview == null || form.formState.isSubmitting}
        >
          Analyze
        </Button>
      </form>
    </Form>
  );
};
