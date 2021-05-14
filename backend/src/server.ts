import "reflect-metadata";
import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import { createConnection } from "typeorm";
import { PORT } from "./constants";
import googleRouter from "./routes/google";
import typeormConfig from "./typeorm.config";
import tasksRouter from "./routes/tasks";

let main = async () => {
  const app = express();

  const connection = await createConnection(typeormConfig);

  connection.runMigrations();

  app.use(
    cors({
      origin: "http://localhost:3000",
      credentials: true,
    })
  );
  app.use(cookieParser());
  app.use(express.urlencoded({ extended: false }));
  app.use(express.json());

  app.use("/auth", googleRouter);
  app.use("/tasks", tasksRouter);

  app.listen(PORT, () => {
    console.log(`Listening on PORT: ${PORT}`);
  });
};

main().catch(console.log);
