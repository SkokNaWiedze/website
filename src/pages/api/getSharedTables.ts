import { NextApiRequest, NextApiResponse } from "next";
import { connectMongoDB } from "../../../libs/mongodb";
import Tables from "../../../models/tables";

export async function POST(req: NextApiRequest, res: NextApiResponse) {
  console.log("getting tables");
  await connectMongoDB();
  const TablesData = await Tables.find();

  // console.log(TablesData);
  const lol = [
    [1, 2, 3],
    [1, 5, 4],
  ];

  console.log("Login" + req.body.login);

  let Shared: any = [{}];

  TablesData.map((i) => {
    i.tables.map((event: any) => {
      console.log(event.numbers);
      if (event.shared.includes(req.body.login)) {
        Shared = [...Shared, { table_name: event.table_name, numbers: event.numbers }];
      }
    });
  });

  res.status(200).json({ results: Shared });
}

export default POST;
