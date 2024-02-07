import { NextApiRequest, NextApiResponse } from "next";
import { connectMongoDB } from "../../../libs/mongodb";
import Tables from "../../../models/tables";

export async function CheckDataFromTeacher(req: NextApiRequest, res: NextApiResponse) {
  // console.log(req.body);
  await connectMongoDB();
  const TablesData = await Tables.find({ isActive: true });
  // console.log(TablesData);
  if (TablesData.length > 0) {
    res.status(200).json({ msg: TablesData });
  } else {
    res.status(400).json({ msg: [] });
  }
}

export default CheckDataFromTeacher;
