import { ImageUploader } from "@/components/image-uploader";
import { Button } from "@/components/ui/button";

export default function Home() {
  return (
    <>
      <section
        id="analyze-image-section"
        className="py-4 flex flex-col items-center gap-4"
      >
        <h1 className="text-center text-xl">Analyze E-commerce Site</h1>
        <ImageUploader />
      </section>

      <section id="results-section" className="flex flex-col gap-4 my-4">
        <h2 className="text-xl">Analysis</h2>
        <div className="aspect-square w-full lg:w-2/3 bg-gray-100 p-2">
          <p>Lorem ipsum dolor sit amet...</p>
          <p>Lorem ipsum dolor sit amet...</p>
        </div>
      </section>
    </>
  );
}
