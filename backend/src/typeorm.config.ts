import { ConnectionOptions } from "typeorm";
import { __prod__ } from "./constants";

export const typeormConfig: ConnectionOptions = {
  type: "postgres",
  host: "localhost",
  username: "postgres",
  password: "postgres",
  port: 5432,
  database: "seeve",
  entities: [__dirname + "/entities/*.js"],
  synchronize: !__prod__,
  logging: !__prod__,
};
