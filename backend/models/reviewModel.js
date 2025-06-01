import mongoose from "mongoose";

const reviewSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'user', required: true },
  parkingSlot: { type: mongoose.Schema.Types.ObjectId, ref: 'parkingSlot', required: true },
  name: { type: String, required: true },
  rating: { type: Number, required: true },
  comment: { type: String },
  createdAt: { type: Date, default: Date.now },
})


const reviewModel = mongoose.models.review || mongoose.model('review', reviewSchema);

export default reviewModel;
