import { NextApiRequest, NextApiResponse } from "next";
import { connectMongoDB } from "../../../libs/mongodb";
import Game from "../../../models/game";
import { reportWebVitals } from "next/dist/build/templates/pages";
import { access } from "fs";

export async function addWeekToBase(req: NextApiRequest, res: NextApiResponse) {
  console.log(req.body);
  await connectMongoDB();
  console.log("conneced");

  try {
    await Game.deleteMany();

    let query = await req.body;

    // console.log(query);

    await Game.create(query);

    res.status(200).json({ msg: "Data was added", data: query });
  } catch (err) {
    console.log(err);
    res.status(400).json({ msg: err });
  }
}

export default addWeekToBase;
