import "reflect-metadata";
import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import { createConnection } from "typeorm";
import { PORT } from "./constants";
import googleRouter from "./routes/google";
import { typeormConfig } from "./typeorm.config";

let main = async () => {
  const app = express();

  await createConnection(typeormConfig);

  app.use(cors());
  app.use(cookieParser());
  app.use(express.urlencoded({ extended: false }));
  app.use(express.json());

  app.use("/auth", googleRouter);

  app.listen(PORT, () => {
    console.log(`Listening on PORT: ${PORT}`);
  });
};

main().catch(console.log);
