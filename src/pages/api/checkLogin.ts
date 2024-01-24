import { NextApiRequest, NextApiResponse } from "next";
import { connectMongoDB } from "../../../libs/mongodb";
import Users from "../../../models/user";

export async function POST(req: NextApiRequest, res: NextApiResponse) {
  console.log(req.body);
  await connectMongoDB();
  const UsersData = await Users.find({ login: req.body.login });
  res.status(200).json({ UsersData });
}

export default POST;
