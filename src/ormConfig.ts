import { ConnectionOptions } from "typeorm";

const ConnectionOptions: ConnectionOptions = {
  type: "postgres",
  database: "testalk",
  synchronize: true,
  logging: true,
  entities: ["entities/**/*.*"],
  host: process.env.DB_ENDPOINT,
  port: parseInt(process.env.DB_PORT ? process.env.DB_PORT : "5432"),
  username: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
};

export default ConnectionOptions;
