import bcrypt from "bcryptjs";
import userModel from "../models/userModel.js"


// get user profile data (success)
export const getProfile = async (req, res) => {

  try {
    const user = await userModel.findById(req.user._id).select('-password');

    if (!user) {
      return res.json({success: false, message: "Can't find the User"})
    }

    res.json({ success:true, user })

  } catch (error) {
      return res.json({success: false, message: error.message})
  }
}

// update user profile (success)
export const updateProfile = async (req, res) => {

  const {name, phone, vehicleType, licensePlate} = req.body;

  try {

    const user = await userModel.findByIdAndUpdate(req.user._id, { name, phone, vehicleType, licensePlate }, {new: true}).select('-password');

    if (!user) {
      return res.json({success: false, message: "Error in finding User"})
    }

    await user.save();

    res.json({success: true, message: "Updated successfully", user})
    
  } catch (error) {
      return res.json({success: false, message: error.message})
  }
}


// change old password (success)
export const changePassword = async (req, res) => {

  const {oldPassword, newPassword} = req.body;

  try {

    const user = await userModel.findById(req.user._id);

    if (!user) {
      return res.json({success: false, message: "Can't find the User"})
    }

    const isMatch = await bcrypt.compare(oldPassword, user.password);

    if (!isMatch) {
      return res.json({ success: false, message: 'Old password is incorrect' });
    }

    user.password = await bcrypt.hash(newPassword, 10);

    await user.save();

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