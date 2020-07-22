const mongoose = require("mongoose");
const { Schema } = mongoose;

const userSchema = new Schema({
  username: String,
  password: { type: String, select: false },
});

userSchema.methods.findByUsername = (name, callBack) => {
  return this.model("User".find({ username: name }, callBack));
};

const user = mongoose.model("user", userSchema);

module.exports = user;

