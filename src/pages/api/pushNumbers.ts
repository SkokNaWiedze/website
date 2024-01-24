import { NextApiRequest, NextApiResponse } from "next";
import { connectMongoDB } from "../../../libs/mongodb";
import Numbers from "../../../models/numbers";

export async function POST(req: NextApiRequest, res: NextApiResponse) {
  console.log("data");
  await connectMongoDB();
  console.log("conneced");
  await Numbers.create(req.body);
  res.status(200).json({ msg: "Data was added" });
}

export default POST;