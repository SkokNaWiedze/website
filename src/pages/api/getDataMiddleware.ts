import { NextApiRequest, NextApiResponse } from "next";
import { connectMongoDB } from "../../../libs/mongodb";
import Session from "../../../models/sessions";

export async function POST(req: NextApiRequest, res: NextApiResponse) {
  console.log("data");
  await connectMongoDB();
  const UsersData = await Session.find({ login: req.body.login, session: req.body.session });

  // console.log(UsersData[0].login);

  if (UsersData[0].login.length > 0) {
    res.status(200).json({ result: "Foudned" });
  } else {
    res.status(400).json({ result: "Not found" });
  }
}

export default POST;
