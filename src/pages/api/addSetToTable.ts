import { NextApiRequest, NextApiResponse } from "next";
import { connectMongoDB } from "../../../libs/mongodb";
import Tables from "../../../models/tables";

export async function addSetToTable(req: NextApiRequest, res: NextApiResponse) {
  console.log(req.body);
  await connectMongoDB();
  console.log("conneced");

  try {
    req.body.numbers.map(async (set: any) => {
      let query = {
        owner: req.body.owner,
        table_name: req.body.table,
        numbers: set,
        shared: req.body.shared,
        asActive: req.body.isActive,
      };

      await Tables.updateOne(
        { owner: req.body.owner, table_name: req.body.table },
        { $push: { numbers: set } },
      );
    });

    res.status(200).json({ msg: "Data was added" });
  } catch (err) {
    console.log(err);
    res.status(400).json({ msg: err });
  }
}

export default addSetToTable;
