import { ConnectionOptions } from "typeorm";
import { __prod__ } from "./constants";

const typeormConfig: ConnectionOptions = {
  type: "postgres",
  host: "localhost",
  username: "postgres",
  password: "postgres",
  port: 5432,
  database: "seeve",
  entities: [__dirname + "/entities/*.js"],
  cli: { migrationsDir: __dirname + "/migrations" },
  migrations: [__dirname + "/migrations/*.ts"],
  synchronize: !__prod__,
  logging: !__prod__,
};

export = typeormConfig;
