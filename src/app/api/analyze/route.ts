import { helloWorldTask } from "@/trigger/example";
import { tasks } from "@trigger.dev/sdk/v3";

export async function POST(request: Request) {
  const data = await request.formData();
  console.log("POST Hello World");
  console.log(data.get("image"));

  const handle = await tasks.trigger<typeof helloWorldTask>("hello-world", {
    payload: {
      image: data.get("image"),
    },
  });

  return Response.json(handle);
}
