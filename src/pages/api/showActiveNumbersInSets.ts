import { NextApiRequest, NextApiResponse } from "next";
import { connectMongoDB } from "../../../libs/mongodb";
import Numbers from "../../../models/numbers";

export async function POST(req: NextApiRequest, res: NextApiResponse) {
  console.log(req.body);
  await connectMongoDB();
  const NumbersActiveData = await Numbers.find({ isActive: true });
  res.status(200).json({ NumbersActiveData });
}

export default POST;
