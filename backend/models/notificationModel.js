import mongoose from "mongoose";

const notificationSchema = new mongoose.Schema({
  user: {type: mongoose.Schema.Types.ObjectId, ref: 'user', required: true},
  title: {type: String, required: true},
  message: {type: String, required: true},
  type: { type: String, enum: ['confirmation', 'cancellation', 'reminder', 'receipt'], required: true },
  sendBy: {type: String, default: "admin"},
  isRead: { type: Boolean, default: false },
  createdAt: { type: Date, default: Date.now }
});

const notificationModel = mongoose.models.notification || mongoose.model('notification', notificationSchema);

export default notificationModel;