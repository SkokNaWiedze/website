import mongoose, { Schema } from "mongoose";

const OrderSchema = new Schema({
  owner: String,
  table_name: String,
  numbers: [[Number]],
  shared: { type: [String] },
  isActive: { type: Boolean },
});

const Tables = mongoose.models.Tables || mongoose.model("Tables", OrderSchema);
export default Tables;
