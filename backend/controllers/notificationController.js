import notificationModel from '../models/notificationModel.js'

export const getNotifications = async (req, res) => {

  try {
    const notifications = await notificationModel.find({ user: req.user._id }).sort({ createdAt: -1 });

    if (!notifications) {
      return res.json({ success: false, message: "notifications not found" });
    }

    res.json({ success: true, notifications });
    
  } catch (error) {
      res.json({ success: false, message: error.message });
  }
}