import mongoose from "mongoose";

export async function connectMongoDB() {
  //   console.log(process.env.MONGO_URI);
  console.log("trying to connect");
  try {
    await mongoose.connect(process.env.MONGO_URI as string);
    console.log("Connected to Mongo DB");
  } catch (error) {
    console.log(error);
  }
}
