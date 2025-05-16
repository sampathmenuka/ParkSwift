import mongoose from 'mongoose'

const bookingSchema = new mongoose.Schema({
  user: {type: mongoose.Schema.Types.ObjectId, ref: 'user', required: true},
  slotLocation: {type: String, required: true},
  startTime: {type:Date, required:true},
  endTime: {type:Date, required: true},
  totalPayment: {type:Number, required:true},
  status:{type: String, enum: ['Confirmed', 'In-progress', 'Completed', 'Cancelled'], default: 'Confirmed'},
})


const bookingModel = mongoose.models.booking || mongoose.model('booking', bookingSchema);

export default bookingModel;