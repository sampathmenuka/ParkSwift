import mongoose from 'mongoose'

const bookingSchema = new mongoose.Schema({
  user: {type: mongoose.Schema.Types.ObjectId, ref: 'user', required: true},
  slot: {type: mongoose.Schema.Types.ObjectId, ref: 'parkingSlot', required: true},
  date: {type: String, required: true}, // yyyy-mm-dd
  startTime: {type:String, required:true}, // hh:mm
  endTime: {type:String, required: true},
  totalPayment: {type:Number, required:true},
  status:{type: String, enum: ['Confirmed', 'In-progress', 'Completed', 'Cancelled'], default: 'Confirmed'},
})


const bookingModel = mongoose.models.booking || mongoose.model('booking', bookingSchema);

export default bookingModel;