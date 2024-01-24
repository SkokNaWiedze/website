import { NextApiRequest, NextApiResponse } from "next";
import cookie from "cookie";

export async function POST(req: NextApiRequest, res: NextApiResponse) {
  let cookies = cookie.parse(req.headers.cookie || "");
  console.log(cookies._bagagwa);
  res.status(200).json({ name: cookies._bagagwa });
}

export default POST;
