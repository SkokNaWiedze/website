import { NextApiRequest, NextApiResponse } from "next";
import { connectMongoDB } from "../../../libs/mongodb";
import Tables from "../../../models/tables";

export async function CheckIfTableExists(req: NextApiRequest, res: NextApiResponse) {
  console.log(req.body);
  await connectMongoDB();
  const TablesData = await Tables.find({ table_name: req.body.table_name });
  console.log(TablesData);
  if (TablesData.length === 0) {
    res.status(200).json({ msg: "It's Free" });
  } else {
    res.status(400).json({ msg: "Exists" });
  }
}

export default CheckIfTableExists;
