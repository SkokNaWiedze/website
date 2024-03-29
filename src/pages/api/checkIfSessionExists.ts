import { NextApiRequest, NextApiResponse } from "next";
import { connectMongoDB } from "../../../libs/mongodb";
import Session from "../../../models/sessions";

export async function checkIfSessionExists(req: NextApiRequest, res: NextApiResponse) {
  // console.log("data middleware" + JSON.stringify(req.body.login));
  await connectMongoDB();
  const UsersData = await Session.find({ login: req.body.login, session: req.body.session });

  // console.log("Data Middle" + JSON.stringify(UsersData));
  console.log(UsersData);

  const UserLoginLength = await UsersData[0].login.length;

  if (UserLoginLength > 0) {
    res.status(200).json({ result: UsersData[0].type });
  } else {
    res.status(400).json({ result: "Not found" });
  }
}

export default checkIfSessionExists;
