import { NextApiRequest, NextApiResponse } from "next";
import cookie from "cookie";

export async function Logout(req: NextApiRequest, res: NextApiResponse) {
  await res.setHeader(
    "Set-Cookie",
    await cookie.serialize("_bagagwa", String("null"), {
      httpOnly: true,
      maxAge: 1,
      path: "/",
    }),
  );
  res.status(200).json({ msg: "Works" });
}

export default Logout;
