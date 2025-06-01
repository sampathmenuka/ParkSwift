const mongoose = require('mongoose');

const parkingSlotSchema = new mongoose.Schema({
  name: { type: String, required: true },
  address: { type: String, required: true },
  type: { type: String, enum: ['covered', 'uncovered'], required: true },
  rate: { type: String, required: true },
  status: { type: String, enum: ['active', 'pending', 'inactive'], default: 'pending' },
});

module.exports = mongoose.model('ParkingSlot', parkingSlotSchema);