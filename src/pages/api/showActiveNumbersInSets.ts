import { NextApiRequest, NextApiResponse } from "next";
import { connectMongoDB } from "../../../libs/mongodb";
import Tables from "../../../models/tables";
import Game from "../../../models/game";

export async function ShowActiveNumbersInSets(req: NextApiRequest, res: NextApiResponse) {
  await connectMongoDB();
  const NumbersActiveData = await Tables.find({ owner: req.body.name });
  const GameData = await Game.find();
  res.status(200).json({ NumbersActiveData, GameData });
}

export default ShowActiveNumbersInSets;
