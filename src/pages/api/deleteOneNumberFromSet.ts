import { NextApiRequest, NextApiResponse } from "next";
import { connectMongoDB } from "../../../libs/mongodb";
import Tables from "../../../models/tables";

export async function deleteOneNumbersFromSetST(req: NextApiRequest, res: NextApiResponse) {
  console.log(req.body.set);
  await connectMongoDB();

  await Tables.updateOne(
    { owner: req.body.owner, table_name: req.body.table_name },
    { $pull: { numbers: req.body.set } },
  );

  const results = await Tables.find({ owner: req.body.owner, table_name: req.body.table_name });
  console.log(results[0].isActive);

  if (results[0].numbers.length === 0) {
    await Tables.updateOne(
      { owner: req.body.owner, table_name: req.body.table_name },
      { $set: { isActive: false } },
    );
  }

  res.status(200).json({ msg: results });
}

export default deleteOneNumbersFromSetST;
