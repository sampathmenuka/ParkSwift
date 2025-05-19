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


export const markAsReadUnread = async (req, res) => {

  const { id } = req.params;
  const { read } = req.body;

  try {

    const notification = await notificationModel.findOne({ _id: id, user: req.user._id })

    if (!notification) {
      return res.json({ success:false, message: "Notification not found" })
    }

    notification.isRead = read;
    await notification.save();

    res.json({ success:true, message: 'Notification updated', notification })
    
  } catch (error) {
      res.json({ success:false, message: error.message });
  }
}


export const markAllAsRead = async (req, res) => {

  try {

    await notificationModel.updateMany({ user: req.user._id, isRead: false}, {$set: { isRead: true}});

    res.json({ success: true, message: "All notifications marked as read"})
    
  } catch (error) {
      res.json(error.message);
  }
}