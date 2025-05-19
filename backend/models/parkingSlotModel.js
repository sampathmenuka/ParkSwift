import mongoose from 'mongoose'

const parkingSlotSchema = new mongoose.Schema({
    location: {type: String, required: true},
    address: {type: String},
    pricePerHour: {type: Number, required: true },
    totalSlots: { type: Number, default: 1},
    available: {type: Boolean, default: true},
    description: {type: String },
    latitude: {type: Number},
    longitude: {type: Number},
  },
);


const parkingSlotModel = mongoose.models.parkingSlot || mongoose.model('parkingSlot', parkingSlotSchema);


export default parkingSlotModel;