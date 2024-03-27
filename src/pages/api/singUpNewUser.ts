import { NextApiRequest, NextApiResponse } from "next";
import { connectMongoDB } from "../../../libs/mongodb";
import Users from "../../../models/user";

export async function POST(req: NextApiRequest, res: NextApiResponse) {
  console.log("data");
  try {
    await connectMongoDB();
    console.log("conneced");
    await Users.create(req.body);
    res.status(200).json({ msg: "added" });
  } catch (err) {
    res.status(400).json({ msg: err });
  }
}

export default POST;
