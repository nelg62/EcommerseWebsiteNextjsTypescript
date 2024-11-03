import { Sequelize } from "sequelize";
import * as dotenv from "dotenv";

// load environemtn variables from .env file
dotenv.config();

// get DATABASE_URL from envireonmetn variable
const databaseUrl = process.env.DATABASE_URL;

if (!databaseUrl) {
  throw new Error("DATABAsE_URL is not defined in the environment variables.");
}

// initialize Sequelize
const sequelize = new Sequelize(databaseUrl, {
  dialect: "postgres",
  logging: false,
});

// export sequelize instance
export default sequelize;
