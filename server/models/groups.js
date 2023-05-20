import mongoose from "mongoose";

const groupSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
  },
  { timestamps: true }
);

const groupsTable = mongoose.model("groups", groupSchema);

export default groupsTable;
