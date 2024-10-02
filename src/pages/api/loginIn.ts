import { NextApiRequest, NextApiResponse } from "next";
import { connectMongoDB } from "../../../libs/mongodb";
import Users from "../../../models/user";
import Session from "../../../models/sessions";
// import cookie from "cookie";
import { setCookie } from "cookies-next";

export async function POST(req: NextApiRequest, res: NextApiResponse) {
  // console.log(req.body);
  await connectMongoDB();
  const UsersData = await Users.find({ login: req.body.login });
  if (UsersData.length === 1) {
    if (req.body.pass === UsersData[0].pass) {
      const oneDay = 24 * 60 * 60 * 1000;

      const NewDate = await new Date();
      const SessionID = await NewDate.getTime();
      const DateInMilisecs = await NewDate.getTime();
      const AccountType = await UsersData[0].type;

      //CHECK IF ANOTHER USER'S Cookie exists, delete it and  session in MongoDB.

      await setCookie("_skok_", String(`${req.body.login}_${SessionID}*${AccountType}`), {
        res,
        req,
        // domain: "skoknawiedze-beta.vercel.app",
        path: "/",
        maxAge: 60 * 60 * 24 * 7,
      }); // 1 week, 604800000 ms,

      const UsersSession = await Session.find({ login: req.body.login });
      if (UsersSession.length === 1) {
        await Session.findOneAndUpdate({
          login: UsersSession[0].login,
          session: SessionID,
          date: SessionID,
          type: AccountType,
        });
      } else {
        await Session.create({
          login: req.body.login,
          session: SessionID,
          date: SessionID,
          type: AccountType,
        });
      }

      res.status(200).json({
        login: req.body.login,
        sessionID: SessionID,
        date: DateInMilisecs,
        type: AccountType,
      });
    } else {
      res.status(400).json({ msg: "Bad Data" });
    }
  } else {
    res.status(400).json({ msg: "Bad Data" });
  }
}

export default POST;
