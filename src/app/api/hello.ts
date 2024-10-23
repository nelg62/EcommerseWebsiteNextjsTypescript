// src/app/api/hello.ts
import { NextApiRequest, NextApiResponse } from "next";

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  console.log("API route was hit");
  res.status(200).json({ message: "Hello from the backend!" });
}
