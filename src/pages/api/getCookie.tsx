import { NextApiRequest, NextApiResponse } from "next";
import cookie from "cookie";

export async function GetCookie(req: NextApiRequest, res: NextApiResponse) {
  console.log("Im in cookie");
  let cookies = await cookie.parse(req.headers.cookie || "");
  let cookieData = await cookies._skok_;
  console.log("it is cookie" + cookies._skok_);
  res.status(200).json({ name: cookieData });
}

export default GetCookie;
