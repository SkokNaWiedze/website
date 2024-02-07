import { NextApiRequest, NextApiResponse } from "next";
import cookie from "cookie";
import { connectMongoDB } from "../../../libs/mongodb";
import Session from "../../../models/sessions";

export async function Logout(req: NextApiRequest, res: NextApiResponse) {
  //   await cookie.serialize("_bagagwa", String("null"), {
  //     // httpOnly: true,
  //     maxAge: 1,
  //     path: "/",
  //   }),
  // );

  await connectMongoDB();
  const SessionResult = await Session.findOneAndDelete({ login: req.body.login });
  await res.setHeader("Set-Cookie", await cookie.serialize("_bagagwa", String("null")));

  res.status(200).json({ msg: "Works" });
}

export default Logout;
