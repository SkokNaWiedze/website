import { NextApiRequest, NextApiResponse } from "next";
import { connectMongoDB } from "../../../libs/mongodb";
import Tables from "../../../models/tables";

export async function AddTables(req: NextApiRequest, res: NextApiResponse) {
  console.log("data");
  try {
    await connectMongoDB();
    console.log("conneced");
    await Tables.create(req.body);
    res.status(200).json({ msg: "added" });
  } catch (err) {
    res.status(400).json({ msg: err });
  }
}

export default AddTables;
