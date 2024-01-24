import { NextApiRequest, NextApiResponse } from "next";
import { connectMongoDB } from "../../../libs/mongodb";
import Numbers from "../../../models/numbers";

export async function POST(req: NextApiRequest, res: NextApiResponse) {
  console.log(req.body);
  await connectMongoDB();
  const NumbersData = await Numbers.find({ Numbers: req.body.Numbers });
  const findID = await NumbersData[0]._id;
  const isActive = await NumbersData[0].isActive;
  await Numbers.findByIdAndDelete(findID, { isActive: !isActive });
  res.status(200).json({ NumbersData });
}

export default POST;
