import mongoose from "mongoose";

const UserSchema = new mongoose.Schema({
  name: {
    type: String,
  },
  email: {
    type: String,
  },
  password: {
    type: String,
  },
  empId: {
    type: String,
  },
  address: {
    type: String,
  },
  role: {
    type: String,
    enum: ["Assistant", "Manager"],
  },
});

export default mongoose.model("User", UserSchema);
