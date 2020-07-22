const mongoose = require("mongoose");
const { Schema } = mongoose;

const BoardSchema = new Schema({
  user: {
    type: Schema.Types.ObjectId,
    ref: "user",
  },
  title: { type: String, required: true },
  columnOrder: [{ type: String, ref: "columns" }],
});

const Board = mongoose.model("boards", BoardSchema);

module.exports = Board;
