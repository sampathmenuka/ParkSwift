import parkingSlotModel from "../models/parkingSlotModel.js";


export const getParkingSlots = async (req, res) => {

  try {

    const filter = {}

    const { location, minPrice, maxPrice, startTime, endTime, date, slotType, available } = req.query;

    if (location) {
      filter.location = { $regex: location, $options: "i" };
    }

    if (minPrice && maxPrice) {
      filter.pricePerHour = { $gte: parseFloat(minPrice), $lte: parseFloat(maxPrice) }
    } else if(minPrice){
        filter.pricePerHour = { $gte: parseFloat(minPrice) };
    } else if (maxPrice) {
        filter.pricePerHour = { $lte: parseFloat(maxPrice) };
    }

    if (slotType) {
      filter.slotType = slotType
    }

    if (available !== undefined) {
      filter.available = available === "true"
    }

    if (date) {
      const dateString = new Date(date).toISOString().split('T')[0]; // '2025-05-27'
      filter.date = dateString;
    }

    if (startTime && endTime) {
      filter.availableFrom = { $lte: startTime };
      filter.availableTo = { $gte: endTime };
    }


    const slots = await parkingSlotModel.find(filter).sort({ pricePerHour: 1})
    
    res.json({success: true, count: slots.length, slots})

  } catch (error) {
      res.json({ success: false, message: error.message })
  }
}

export const getParkingSlot = async (req, res) => {

  const id = req.params.id;

  try {
    
    const slot = await parkingSlotModel.findById(id);

    if (!slot) {
      res.json({success: false, message: "Slot not found"})
    }

    res.json({success: true, slot});

  } catch (error) {
      res.json({success: false, message: error.message})
  }
}


