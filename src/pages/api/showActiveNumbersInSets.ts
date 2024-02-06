import { NextApiRequest, NextApiResponse } from "next";
import { connectMongoDB } from "../../../libs/mongodb";
import Tables from "../../../models/tables";

export async function ShowActiveNumbersInSets(req: NextApiRequest, res: NextApiResponse) {
  await connectMongoDB();
  const NumbersActiveData = await Tables.find({ owner: req.body.name });
  res.status(200).json({ NumbersActiveData });
}

export default ShowActiveNumbersInSets;
