import mongoose from "mongoose";

const testAttemptSchema = new mongoose.Schema({
  test: { type: mongoose.Schema.Types.ObjectId, ref: "Test", required: true },
  sign: { type: mongoose.Schema.Types.ObjectId, ref: "Sign", required: true },
  score: { type: Number, required: true },
  is_correct: { type: Boolean, required: true },
});

export const TestAttempt = mongoose.model("TestAttempt", testAttemptSchema);
