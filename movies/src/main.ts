import { createApp } from "./app.js";

async function main() {
  const app = await createApp();
  const port = Number(process.env.PORT) || 5001;

  app.listen({ port, host: "0.0.0.0" });
}

main();
