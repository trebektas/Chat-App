import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    username: { type: String, required: true },
  },
  { timestamps: true }
);

const usersTable = mongoose.model("users", userSchema);

export default usersTable;
