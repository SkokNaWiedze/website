import { NextApiRequest, NextApiResponse } from "next";
import { connectMongoDB } from "../../../libs/mongodb";
import Session from "../../../models/sessions";

export async function Logout(req: NextApiRequest, res: NextApiResponse) {
  await connectMongoDB();
  const SessionResult = await Session.findOneAndDelete({ login: req.body.login });

  res.status(200).json({ msg: "Works" });
}

export default Logout;
