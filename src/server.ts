import mongoose from "mongoose";
import { Server } from "http";
import config from "./app/config";
import app from "./app";

let server: Server;

async function main() {
  try {
    await mongoose.connect(config.database_url as string);

    app.listen(config.port, () => {
      console.log(`Example app listening on port ${config.port}`);
    });
  } catch (error) {
    console.log(error);
  }
}

main();

process.on("unhandledRejection", () => {
  console.log(`🛑 UnhandledRejection is detected, Server shutting down.`);
  if (server) {
    server.close(() => {
      process.exit(1);
    });
  }
  process.exit(1);
});

process.on("uncaughtException", () => {
  console.log(`🚫 UncaughtException is detected, Server shutting down.`);
  process.exit(1);
});
