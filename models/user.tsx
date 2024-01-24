import mongoose, { Schema } from "mongoose";

const OrderSchema = new Schema({
  // id: String,
  login: String,
  firstName: String,
  lastName: String,
  mail: String,
  pass: String,
  type: String,
  isActive: { type: Boolean, default: false },
});

const Users = mongoose.models.Users || mongoose.model("Users", OrderSchema);
export default Users;
