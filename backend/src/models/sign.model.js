import mongoose from 'mongoose';

const signSchema = new mongoose.Schema({
  name: { type: String, required: true },
  image_path: { type: String, required: true },
}, { timestamps: true });

export const Sign = mongoose.model('Sign', signSchema);
