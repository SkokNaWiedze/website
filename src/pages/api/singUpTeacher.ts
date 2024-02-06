import { NextApiRequest, NextApiResponse } from "next";
import { connectMongoDB } from "../../../libs/mongodb";
import Users from "../../../models/user";
import Tables from "../../../models/tables";

export async function SignUpTeacher(req: NextApiRequest, res: NextApiResponse) {
  console.log("data");

  try {
    await connectMongoDB();
    console.log("conneced");
    // await Users.create(req.body);
    await Tables.create({
      owner: "Marek",
      table_name: "Łatwy",
      numbers: [
        [1, 2, 3],
        [4, 5, 6],
        [14, 15, 16],
        [24, 25, 36],
        [34, 35, 36],
        [44, 45, 46],
        [4, 5, 6],
        [54, 55, 56],
        [64, 65, 66],
        [74, 75, 76],
        [45, 57, 68],
      ],
      shared: ["Marek"],
      isActive: true,
    });
    res.status(200).json({ msg: "added" });
  } catch (err) {
    res.status(400).json({ msg: err });
  }
}

export default SignUpTeacher;
