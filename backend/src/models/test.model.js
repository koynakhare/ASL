import mongoose from "mongoose";
import { TestAttempt } from "./TestAttempt.js";

const testSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  created_at: { type: Date, default: Date.now },
});

// Virtual populate for attempts
testSchema.virtual("attempts", {
  ref: "TestAttempt",
  localField: "_id",
  foreignField: "test",
});

testSchema.set("toObject", { virtuals: true });
testSchema.set("toJSON", { virtuals: true });

export const Test = mongoose.model("Test", testSchema);
