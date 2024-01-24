import mongoose, { Schema } from "mongoose";

const OrderSchema = new Schema({
  // id: String,
  Numbers: [Number],
  isActive: { type: Boolean, default: false },
});

const Numbers = mongoose.models.Numbers || mongoose.model("Numbers", OrderSchema);
export default Numbers;
