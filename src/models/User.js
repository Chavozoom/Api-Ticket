import mongoose from "mongoose";
import bcrypt from "bcrypt";

const UserSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
  },
  password: {
    type: String,
    required: true,

  },
  eventTicketsBought: [{
    amount:{
      type: Number,
      required: true,
    },
    event:{
      type: mongoose.Schema.Types.ObjectId,
      ref:"Event",
      required: true,
    },
  }],
  userPhoto:{
    type: String,
  }
});

UserSchema.pre("save", async function (next) {
  this.password = await bcrypt.hash(this.password, 10);
  next();
});

const User = mongoose.model("User", UserSchema);

export default User;