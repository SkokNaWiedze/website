import { NextApiRequest, NextApiResponse } from "next";
import { connectMongoDB } from "../../../libs/mongodb";
import Tables from "../../../models/tables";

export async function DeleteTable(req: NextApiRequest, res: NextApiResponse) {
  console.log(req.body);
  await connectMongoDB();
  await Tables.findOneAndDelete({ owner: req.body.owner, table_name: req.body.table_name });
  res.status(200).json({ msg: "deleted" });
}

export default DeleteTable;
