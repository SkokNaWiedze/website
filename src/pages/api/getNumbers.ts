import { NextApiRequest, NextApiResponse } from "next";
import { connectMongoDB } from "../../../libs/mongodb";
import Numbers from "../../../models/numbers";

export async function POST(req: NextApiRequest, res: NextApiResponse) {
  // console.log(req.body);
  await connectMongoDB();
  const NumbersData = await Numbers.find({});
  res.status(200).json({ NumbersData });
}

export default POST;
