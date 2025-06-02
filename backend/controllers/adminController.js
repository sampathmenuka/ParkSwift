import bookingModel from "../models/bookingModel.js";
import notificationModel from "../models/notificationModel.js";
import parkingSlotModel from "../models/parkingSlotModel.js";
import userModel from "../models/userModel.js";


// Manage users 
export const getAllUsers = async (req, res) => {

  try {

    const users = await userModel.find({}, '-password -resetOtp -resetOtpExpireAt');

    if (!users) {
      return res.json({ success: false, message: "Can't find Users"});      
    }

    res.json({ success: true, users});
    
  } catch (error) {
      res.json({ success: false, message: error.message})
  }
}


export const toggleUserStatus = async (req, res) => {

  try {

    const user = await userModel.findById(req.params.id);

    if (!user) {
      return res.json({ success: false, message: 'User not found' });
    }

    user.status = user.status === 'active' ? 'banned' : 'active';

    await user.save();

    res.json({ success: true, message: `User ${user.status}`, user });
    
  } catch (error) {
      res.json({ success: false, message: error.message })
  }
}

export const getUserById = async (req, res) => {

  try {

    const user = await userModel.findById(req.params.id).select('-password -resetOtp -resetOtpExpireAt');

    if (!user){
      return res.json({ success: false, message: 'User not found' });
    } 

    res.json({success: true, user});
  } catch (error) {
      res.json({ success: false, message: error.message});
  }
};

// manage slots 
export const getAllSlots = async (req, res) => {

  try {

    const slots = await parkingSlotModel.find();

    if (!slots) {
      return res.json({ success: false, message: "slots not found"})
    }

    res.json({ success: true, slots})
    
  } catch (error) {
      res.json({success: false, message: error.message})
  }
}

export const updateSlotStatus = async (req, res) => {

  const { id } = req.params;
  const { available } = req.body;

  try {
    const slot = await parkingSlotModel.findById(id);

    if (!slot) {
      return res.json({ success: false, message: 'Slot not found' });
    }

    slot.available = available;

    await slot.save();

    res.json({success: true, message: `Slot is now ${available ? 'available' : 'unavailable'}` });

  } catch (error) {
      res.json({success: false, message: error.message})
  }
};

export const deleteSlot = async (req, res) => {

  const { id } = req.params;

  try {

    const slot = await parkingSlotModel.findById(id);

    if (!slot) {
      return res.json({ success: false, message: 'Slot not found' });
    }

    await slot.deleteOne();

    res.json({ success: true, message: 'Slot deleted successfully' });

  } catch (error) {
      res.json({success: false, message: error.message})
  }
};


// get bookig details
export const getAllBookings = async (req, res) => {

  try {

    const bookings = await bookingModel.find().populate('user', 'name email').populate('slot', 'location')

    if (!bookings) {
      return res.json({ success: false, message: 'Booking not found' });
    }

    res.json({ success: true, bookings });
    
  } catch (error) {
      res.json({success: false, message: error.message})
  }
}


export const sendNotificationToUser = async (req, res) => {

  try {
    
    const { userId, title, message, type} = req.body

    const user = await userModel.findById(userId)

    if (!user) {
      return res.json({ success: false, message: 'User not found' });
    }

    const newNotification = new notificationModel({
      user: userId,
      title,
      message,
      type,
      sendBy: 'admin'
    });

    await newNotification.save();

    res.json({ success: true, messsage: "Notification sent successfully", notification: newNotification });

  } catch (error) {
      res.json({success: false, message: error.message})
  }
}

export const getNotificationStats = async (req, res) => {

  try {

    const notifications = await notificationModel.find({ sendBy: "admin" }).populate("user", "role");

    if (!notifications) {
      return res.json({ success: false, message: 'No notifications found' });
    }

    const totalSent = notifications.length;
    const toUsers = notifications.filter(n => n.user?.role === "user").length;
    const toOwners = notifications.filter(n => n.user?.role === "owner").length;

    res.json({ success: true, totalSent, toUsers, toOwners });
  } catch (error) {
      res.json({success: false, message: error.message})
  }
};

export const getUsers = async (req, res) => {

  try {
    
    const users = await userModel.find( { role: { $ne: "admin" }}).select("name email role");

    if (!users) {
      return res.json({ success: false, message: "users not found"})
    }

    res.json({ success: true, users});
    
  } catch (error) {
      res.json({ success: false, message: error.message});
  }
}

export const getRecentNotifications = async (req, res) => {
  try {
    const notifications = await notificationModel.find({ sendBy: "admin" }).populate("user", "name role").sort({ createdAt: -1 }).limit(10); 

    if (!notifications) {
      return res.json({success: false, message: "No notifications found"});
    }

    const formatted = notifications.map((n) => ({ title: n.title,message: n.message, target: n.user?.role || "unknown", sent: new Date(n.createdAt).toLocaleString(), by: n.sendBy }));

    res.json({success: true, formatted});
  } catch (error) {
      res.json({ success: false, message: error.message});
  }
};