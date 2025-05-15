import userModel from "../models/userModel.js";
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'
import transporter from '../config/nodemailer.js'

// registration (success)
export const register = async (req, res) => {

  const { name, email, password, confirmPassword, phone, role, vehicleType, licensePlate } = req.body;

  if (!name || !email || !password || !confirmPassword || !phone || !role) {
    return res.json({success: false, message: "Missing Details"})
  }

  if (password !== confirmPassword) {
    return res.json({success:false, message: "passwords do not match"})
  }

  try {

    const existingUser = await userModel.findOne({email})

    if (existingUser) {
      return res.json({success:false, message: "User already exist"}) 
    }
    
    // encrypt password
    const hashedPassword = await bcrypt.hash(password, 10);

    const user = new userModel({ name, email, password:hashedPassword, phone, role, vehicleType, licensePlate });

    await user.save();

    const token = jwt.sign({id: user._id}, process.env.JWT_SECRET, { expiresIn: '7d'})

    res.cookie('token', token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: process.env.NODE_ENV === 'production' ? 'none' : 'strict',
      maxAge: 7 * 24 * 60 * 60 * 1000,
    })

    const mailOptions = {
      from: process.env.SENDER_EMAIL,
      to: email,
      subject: "Welcome to ParkSwift",
      text: `Welcome to my website. Your account has been created with email id: ${email}, Thank you!`
    }

    await transporter.sendMail(mailOptions);

    return res.json({success: true, user: {
      name:user.name,
      email:user.email,
      phone:user.phone,
      role:user.role, 
      vehicleType:user.vehicleType, 
      licensePlate:user.licensePlate
    }})

  } catch (error) {
      console.log(error.message);
      res.json({success: false, message: error.message})
  }
}

// login (success)
export const login = async (req, res) => {

  const { email, password, role } = req.body

  if (!email || !password || !role) {
    return res.json({success:false, message: "Missing Details"})
  }

  try {

    const user = await userModel.findOne({email, role})

    if (!user) {
      return res.json({success: false, message: "Invalid Credentials"})
    }

    const isMatch = await bcrypt.compare(password, user.password)

    if (!isMatch) {
      return res.json({success:false, message: "Invalid Password"})
    }

    const token = jwt.sign({id: user._id}, process.env.JWT_SECRET, { expiresIn: '7d' });

    res.cookie('token', token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: process.env.NODE_ENV === 'production' ? 'none' : 'strict',
      maxAge: 7 * 24 * 60 * 60 * 1000
    });

    res.json({success: true, user: {
      name: user.name,
      email: user.email,
      role: user.role,
    }});
    
  } catch (error) {
      console.log(error.message);
      res.json({success: false, message: error.message})
  }
}

// Logout (success)
export const logout = async (req, res) => {

  try {

    res.clearCookie('token', {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: process.env.NODE_ENV === 'production' ? 'none' : 'strict',
    })

    return res.json({success: true, message: "Logged out"})
    
  } catch (error) {
      console.log(error.message);
      res.json({success: false, message: error.message})
  }
}

// check if user is authenticated (success)
export const isAuthenticated = async (req, res) => {

  try {
    const user = req.user;

    return res.json({ success: true, user: {
      name: user.name,
      email: user.email,
      role: user.role,
      phone: user.phone,
      vehicleType: user.vehicleType,
      licensePlate: user.licensePlate
    } }) // changed
  } catch (error) {
      return res.json({success:false, message:error.message})
  }
}



// send password reset otp (success)
export const sendResetOtp = async (req, res) => {

  const { email } = req.body;

  if (!email) {
    return res.json({success:false, message: "Email is required"})
  }

  try {

    const user = await userModel.findOne({email})

    if (!user) {
      return res.json({success:false, message: "User not found"})
    }

    const otp = String(Math.floor(100000 + Math.random() * 900000))

    user.resetOtp = otp;

    user.resetOtpExpireAt = Date.now() + 15 * 60 * 1000

    await user.save();

    const mailOptions = {
      from: process.env.SENDER_EMAIL,
      to: user.email,
      subject: "Password reset OTP",
      text: `Your OTP for resetting your password is ${otp}. Use this OTP to proceed with resetting your password.`,
    };

    await transporter.sendMail(mailOptions);

    return res.json({success:true, message:"OTP send to your email"})
    
  } catch (error) {
      res.json({success:false, message:error.message});
  }
}

//Reset user Password (success)
export const resetPassword = async (req, res) => {

  const {email, otp, newPassword} = req.body

  if (!email || !otp || !newPassword) {
    return res.json({success:false, message:"Email, Otp and New Password are required"})
  }

  try {

    const user = await userModel.findOne({email})

    if (!user) {
      return res.json({success:false, message:"User not found"})
    }

    if (user.resetOtp === '' || user.resetOtp !== otp) {
      return res.json({success:false, message:"Invalid OTP"})
    }
    
    if (user.resetOtpExpireAt < Date.now()) {
      return res.json({success:false, message:"OTP Expired"})
    }

    const hashedPassword = await bcrypt.hash(newPassword, 10);

    user.password = hashedPassword;

    user.resetOtp = ''
    user.resetOtpExpireAt = 0;

    await user.save();

    return res.json({success:true, message:"Password has been reset successfully"})

  } catch (error) {
    return res.json({success:false, message: error.message})
  }
}