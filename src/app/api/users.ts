import sequelize from "@/db";
// import User from "@/models/User";
import { NextApiRequest, NextApiResponse } from "next";

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    await sequelize.authenticate();
    console.log(
      "Connection to the database has been established successfully."
    );

    await sequelize.sync();
  } catch (error) {
    console.error("Unable to connect to the database:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

export default handler;
