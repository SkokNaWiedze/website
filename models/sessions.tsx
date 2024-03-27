import mongoose, { Schema } from "mongoose";

const OrderSchema = new Schema({
  login: String,
  session: Number,
  date: Number,
  type: String,
});

const Session = mongoose.models.Session || mongoose.model("Session", OrderSchema);
export default Session;
