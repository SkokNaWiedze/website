import mongoose, { Schema } from "mongoose";

const OrderSchema = new Schema({
  Numbers: [Number],
  Order: Number,
});

const Set = mongoose.models.Set || mongoose.model("Set", OrderSchema);
export default Set;
