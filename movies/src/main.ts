import { createApp } from "./app.js";

async function main() {
  const app = await createApp();

  app.listen({ port: 5000, host: "0.0.0.0" });
}

main();
