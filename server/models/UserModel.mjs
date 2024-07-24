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
    enum: ["ASSISTANT", "MANAGER", "ADMIN"],
  },
  profilePicture: {
    type: String,
    default:
      "https://cdn.vectorstock.com/i/500p/54/17/person-gray-photo-placeholder-man-vector-24005417.jpg",
  },
});

export default mongoose.model("User", UserSchema);
