import mongoose from "mongoose";

const ClientSchema = new mongoose.Schema({
  name: {
    type: String,
  },
  email: {
    type: String,
  },
  mobileNumber: {
    type: String,
  },
  hasWhatsapp: {
    type: Boolean,
  },
  address: {
    type: String,
  },
  createdBy: {
    type: String,
  },
  registedDate: {
    type: Date,
  },
  lastModifiedBy: {
    type: String,
  },
  lastModifiedDate: {
    type: Date,
  },
});

export default mongoose.model("client", ClientSchema);
