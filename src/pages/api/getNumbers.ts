import { NextApiRequest, NextApiResponse } from "next";
import { connectMongoDB } from "../../../libs/mongodb";
import Numbers from "../../../models/numbers";
import Users from "../../../models/user";
import Game from "../../../models/game";

export async function POST(req: NextApiRequest, res: NextApiResponse) {
  // console.log(req.body);
  await connectMongoDB();
  const NumbersData = await Numbers.find({});
  const UsersData = await Users.find({});
  const GameData = await Game.find({});
  res.status(200).json({ NumbersData, UsersData, GameData });
}

export default POST;
