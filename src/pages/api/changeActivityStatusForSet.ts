import { NextApiRequest, NextApiResponse } from "next";
import { connectMongoDB } from "../../../libs/mongodb";
import Tables from "../../../models/tables";

export async function ChangeAcvitivtyStatus(req: NextApiRequest, res: NextApiResponse) {
  console.log(req.body);
  await connectMongoDB();
  const TableName = await Tables.find({ table_name: req.body.name, owner: req.body.login });
  const findID = await TableName[0]._id;
  const isActive = await TableName[0].isActive;
  await Tables.findByIdAndUpdate(findID, { isActive: !isActive });
  res.status(200).json({ TableName });
}

export default ChangeAcvitivtyStatus;
