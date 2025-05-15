import mongoose from 'mongoose'

const userSchema = new mongoose.Schema({
  name: {type: String, trim: true},
  email: {type: String, required: true, unique: true, trim: true, lowercase: true},
  password: {type: String, required: true},
  phone: {type: String},
  role: { type: String, enum: ['user', 'owner', 'admin'], default: 'user' },
  vehicleType: {type: String},
  licensePlate: {type: String},
  resetOtp: {type: String, default: ''},
  resetOtpExpireAt: {type: Number, default: 0},
})



const userModel = mongoose.models.user || mongoose.model('user', userSchema);

export default userModel;