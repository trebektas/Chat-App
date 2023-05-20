import mongoose from "mongoose";

const { SchemaTypes } = mongoose;
const messageSchema = new mongoose.Schema(
  {
    groupId: { type: SchemaTypes.ObjectId, ref: "groups", required: true },
    userId: { type: SchemaTypes.ObjectId, ref: "users", required: true },
    message: { type: String, required: true },
  },
  { timestamps: true }
);

const messagesTable = mongoose.model("messages", messageSchema);

export default messagesTable;
