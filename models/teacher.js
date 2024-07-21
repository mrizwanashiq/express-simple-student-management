import mongoose from "mongoose";

const schema = mongoose.Schema({
  name: { type: String, required: true, unique: true },
  email: { type: String, required: true },
  phoneNumber: { type: Number, required: true, min: 0 },
  isDeleted: { type: Boolean, default: false },
});

export default mongoose.model("Teacher", schema);
