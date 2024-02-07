import { NextApiRequest, NextApiResponse } from "next";
import cookie from "cookie";
import { connectMongoDB } from "../../../libs/mongodb";
import Session from "../../../models/sessions";
import { getCookies, deleteCookie } from "cookies-next";

export async function Logout(req: NextApiRequest, res: NextApiResponse) {
  console.log("sdadsdadsdssdadsdsdsadsdsdsadsadadad");
  await connectMongoDB();
  const SessionResult = await Session.findOneAndDelete({ login: req.body.login });
  let cookieFromBrowser = await cookie.parse(req.headers.cookie || "");
  let cookieData = await cookieFromBrowser._bagagwa;
  console.log("kolo" + cookieData);
  // await deleteCookie("_bagagwa", {
  //   res,
  //   req,
  //   // domain: "skoknawiedze-beta.vercel.app",
  //   path: "/",
  //   // maxAge: 60 * 60 * 24 * 7,
  // }); // 1 week, 604800000 ms,

  // await res
  //   .setHeader(
  //     "Set-Cookie",
  //     cookie.serialize("_bagagwa", String(`null`), {
  //       // httpOnly: true,
  //       // domain: "https://skoknawiedze-beta.vercel.app/",
  //       maxAge: 1, // 1 week, 604800000 ms,
  //       path: "/",
  //     }),
  //   )
  res.status(200).json({ msg: "Works" });
}

export default Logout;
