import mongoose, { Schema } from "mongoose";

const OrderSchema = new Schema({
  id: { type: Number },
  name: { type: String },
  numbers: Schema.Types.Mixed,
  access: { type: Array },
});

const Game = mongoose.models.Game || mongoose.model("Game", OrderSchema);
export default Game;
