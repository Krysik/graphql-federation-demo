import { createApp } from "./app.js";

async function main() {
  const app = await createApp();

  app.listen({ port: 5001 });
}

main();
