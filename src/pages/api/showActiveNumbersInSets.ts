import { NextApiRequest, NextApiResponse } from "next";
import { connectMongoDB } from "../../../libs/mongodb";
import Tables from "../../../models/tables";

export async function ShowActiveNumbersInSets(req: NextApiRequest, res: NextApiResponse) {
  console.log("shooooooooooooooooow" + req.body.name);
  await connectMongoDB();
  const NumbersActiveData = await Tables.find({ owner: req.body.name });
  res.status(200).json({ NumbersActiveData });
}

export default ShowActiveNumbersInSets;
