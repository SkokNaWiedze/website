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
    const allREcords = await Game.find({});
    const calculateId = allREcords.length + 1;

    let query = {
      id: calculateId,
      name: req.body.name,
      numbers: req.body.numbers,
      access: calculateId === 1 ? "open" : [],
    };

    await Game.create(query);

    res.status(200).json({ msg: "Data was added", data: allREcords });
  } catch (err) {
    console.log(err);
    res.status(400).json({ msg: err });
  }
}

export default addWeekToBase;
