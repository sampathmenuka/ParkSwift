import bookingModel from "../models/bookingModel.js"
import parkingSlotModel from "../models/parkingSlotModel.js"
import {v2 as cloudinary} from 'cloudinary'
import userModel from "../models/userModel.js"
import bcrypt from "bcryptjs"


// add slots
export const addSlot = async (req, res) => {

  try {

    let imageURL = ""

    if (req.file) {
      const result = await cloudinary.uploader.upload(req.file.path, {
        resource_type: "image",
      });
      imageURL = result.secure_url;
    }

    const newSlot = await parkingSlotModel.create({...req.body, owner: req.user._id, images: imageURL})

    if (newSlot) {
      res.json({success:true, slot: newSlot, message: "New slot added successfully"})
    } else {
        res.json({success:false, message: "error in creating slot"})
    }
    
  } catch (error) {
      res.json({success: false, message: error.message})
  }
}

// get slot details
export const getMySlots = async (req, res) => {

  try {
    
    const slots = await parkingSlotModel.find({ owner: req.user._id})

    if (slots) {
      res.json({success: true, slots})
    }
    
  } catch (error) {
      res.json({success: false, message: error.message})
  }
}

// get owner profile 
export const getProfile = async (req, res) => {

  try {
    const owner = await userModel.findById(req.user._id).select('-password');

    if (!owner) {
      return res.json({success: false, message: "Can't find the Owner"})
    }

    res.json({ success:true, owner })

  } catch (error) {
      return res.json({success: false, message: error.message})
  }
}

// update owner profile (success)
export const updateProfile = async (req, res) => {

  const {name, phone} = req.body;

  try {

    const owner = await userModel.findByIdAndUpdate(req.user._id, { name, phone }, {new: true}).select('-password');

    if (!owner) {
      return res.json({success: false, message: "Error in finding Owner"})
    }

    await owner.save();

    res.json({success: true, message: "Updated successfully", owner})
    
  } catch (error) {
      return res.json({success: false, message: error.message})
  }
}


// update slot 
export const updateSlot = async (req, res) => {

  let imageURL = null;

  const { location, address, pricePerHour, date, available, totalSlots, description, latitude, longitude, vehicleTypeAllowed, slotType, availableFrom, availableTo } = req.body

  const updateData = { 
    location, address, pricePerHour, totalSlots, date, available, description, latitude, longitude, vehicleTypeAllowed, slotType, availableFrom, availableTo 
  }
    
  const imageFile = req.file;

  try {
    
    if (imageFile) {
      // upload image ot cloudinary
      const imageUpload = await cloudinary.uploader.upload(imageFile.path, {resource_type:'image'})

      imageURL = imageUpload.secure_url

      updateData.images = imageURL;
    }

    const updated = await parkingSlotModel.findOneAndUpdate({ _id:req.params.id, owner: req.user._id}, updateData, {new: true})


    if (updated) {
      res.json({success: true, slot: updated, message: "Slot updated successfully"})
    } else {
        return res.json({success: false, message: "Slot not found or unauthorized"})
    }
    
  } catch (error) {
      res.json({success: false, message: error.message})
  }
}

// delete slot 
export const deleteSlot = async (req, res) => {

  try {
    
    const deleted = await parkingSlotModel.findOneAndDelete({ _id: req.params.id, owner: req.user._id})

    if (deleted) {
      res.json({ success:true, message: "slot deleted" })
    } else {
        res.json({ success:false, message: "Slot not found or unauthorized" })
    }
  } catch (error) {
      res.json({success: false, message: error.message})
  }
}

// change old password (success)
export const changePassword = async (req, res) => {

  const {oldPassword, newPassword} = req.body;

  try {

    const owner = await userModel.findById(req.user._id);

    if (!owner) {
      return res.json({success: false, message: "Can't find the Owner"})
    }

    const isMatch = await bcrypt.compare(oldPassword, owner.password);

    if (!isMatch) {
      return res.json({ success: false, message: 'Old password is incorrect' });
    }

    if (newPassword.length < 7 || !newPassword) {
      return res.json({success:false, message: "Password must be greater than 6 digits"})
    }

    owner.password = await bcrypt.hash(newPassword, 10);

    await owner.save();

    res.json({ success: true, message: 'Password changed successfully' });
    
  } catch (error) {
      return res.json({success: false, message: error.message})
  }
}


// delete account (success)
export const deleteAccount = async (req, res) => {

  await userModel.findByIdAndDelete(req.user._id);

  res.clearCookie('token');

  res.json({ success: true, message: 'Account deleted successfully' });
}

// get bookings for owners
export const getBookingsForOwner = async (req, res) => {
  try {
    const slots = await parkingSlotModel.find({owner: req.user._id})

    const slotIds = slots.map(slot => slot._id)

    const bookings = await bookingModel.find({ slot: {$in: slotIds}}).populate('user slot')

    if (bookings) {
      res.json({success: true, bookings})  
    } else {
      res.json({success: false, message:"error in getting slots"})  
    }
  } catch (error) {
      res.json({success: false, message: error.message}) 
  }
}

// Get earnings summary
export const getOwnerEarnings = async (req, res) => {

  try {
    const slots = await parkingSlotModel.find({ owner: req.user._id });
    const slotIds = slots.map(slot => slot._id);

    const bookings = await bookingModel.find({ slot: { $in: slotIds }, status: { $ne: 'Cancelled' } });

    const totalRevenue = bookings.reduce((sum, b) => sum + b.totalPayment, 0);
    const averagePerBooking = bookings.length > 0 ? totalRevenue / bookings.length : 0;

    const earningsList = bookings.map(b => ({
      bookingId: b._id,
      slotLocation: b.slot.location,
      amount: b.totalPayment,
      date: b.date,
    }));

    const weeklyEarnings = [
      { day: 'Mon', earnings: 120 },
      { day: 'Tue', earnings: 140 },
      { day: 'Wed', earnings: 80 },
      { day: 'Thu', earnings: 170 },
      { day: 'Fri', earnings: 200 },
      { day: 'Sat', earnings: 230 },
      { day: 'Sun', earnings: 180 }
    ];

    res.json({
      success: true,
      data: {
        totalRevenue,
        totalBookings: bookings.length,
        averagePerBooking,
        earningsList,
        weeklyEarnings,
        pendingPayout: 1850,
        lastPayout: { amount: 2400, date: '2025-04-25'}
      }  
    });

  } catch (error) {
    res.json({ success: false, message: error.message });
  }
};


export const withdrawMoney = (req, res) => {
  res.json({ success: true, message: `Withdrawal of LKR. 1850 has been initiated. Funds will be transferred to your account within 2-3 business days.`});
};
