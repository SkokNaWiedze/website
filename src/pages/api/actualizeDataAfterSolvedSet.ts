import { NextApiRequest, NextApiResponse } from "next";
import { connectMongoDB } from "../../../libs/mongodb";
import Game from "../../../models/game";
import { access } from "fs";

export async function POST(req: NextApiRequest, res: NextApiResponse) {
  // console.log(req.body);
  await connectMongoDB();

  //find record by 'name'
  const NumbersData = await Game.find({ name: req.body.setname });

  //get ID of founded record and add
  const NumbersDataMainRecordIdFromMongodDB = NumbersData[0]._id.toString();

  await Game.findByIdAndUpdate(NumbersDataMainRecordIdFromMongodDB, {
    $push: { solved: req.body.user },
  });

  console.log();

  //get ID of founded record and add 1
  const addAccesToIdNumebrs = NumbersData[0].id + 1;

  //find another record
  const NumbersDataNextRecord = await Game.find({ id: addAccesToIdNumebrs });

  //find generated by MongoDB ID
  const NumbersDataNextRecordIdFromMongodDB = NumbersDataNextRecord[0]._id.toString();

  console.log(NumbersDataNextRecord);

  //find record by MongoDB id and update
  await Game.findByIdAndUpdate(NumbersDataNextRecordIdFromMongodDB, {
    $push: { access: req.body.user },
  });

  res.status(200).json({ NumbersData });
}

export default POST;
