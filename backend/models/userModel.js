import mongoose from 'mongoose'
import validator from 'validator'

const userSchema = new mongoose.Schema({
  name: {type: String, trim: true, required: true},
  email: {type: String, required: true, unique: true, trim: true, lowercase: true, validate: [validator.isEmail, 'Please provide a valid email']},
  password: {type: String, required: true},
  phone: {type: String, required: true},
  role: { type: String, enum: ['user', 'owner', 'admin'], default: 'user' },
  vehicleType: {type: String},
  licensePlate: {type: String},
  resetOtp: {type: String, default: ''},
  resetOtpExpireAt: {type: Number, default: 0},
})



const userModel = mongoose.models.user || mongoose.model('user', userSchema);

export default userModel;