import mongoose from "mongoose";

const ProjectSchema = new mongoose.Schema({
  name: {
    type: String,
  },
  description: {
    type: String,
  },
  status: {
    type: String,
    enum: ["Not Started", "In Progess", "Completed"],
  },
  clientId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "ClientModel",
  },
});

export default mongoose.model("Project", ProjectSchema);
