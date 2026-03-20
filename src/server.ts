import mongoose from "mongoose";
import app from "./app";
import { env } from "./utils/env";

const startServer = async (): Promise<void> => {
  try {
    await mongoose.connect(env.mongodbUri);
    console.log("Connected to MongoDB");

    app.listen(env.port, () => {
      console.log(`Server is running on http://localhost:${env.port}`);
      console.log(
        `Swagger docs available at http://localhost:${env.port}/api-docs`,
      );
    });
  } catch (error) {
    console.error("Failed to start server", error);
    process.exit(1);
  }
};

void startServer();
