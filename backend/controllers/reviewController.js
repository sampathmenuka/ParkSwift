import bookingModel from "../models/bookingModel.js";
import parkingSlotModel from "../models/parkingSlotModel.js";
import reviewModel from "../models/reviewModel.js";


// user creates review 
export const createReview = async (req, res) => {

  try {

    const { rating, comment } = req.body;
    const slotId = req.params.slotId;

    const slot = await parkingSlotModel.findById(slotId);

    if (!slot) {
      return res.json({ success: false, message: 'Parking slot not found' });
    }

    // Check if user already reviewed
    const existingReview  = await reviewModel.findOne({ user: req.user._id, parkingSlot: slotId})

    if (existingReview ) {
      // Update review
      existingReview.rating = rating;
      existingReview.comment = comment;

      await existingReview.save();

    } else {
        // Create review
        await reviewModel.create({
          user: req.user._id,
          parkingSlot: slotId,
          name: req.user.name,
          rating,
          comment
        });
      }

    const reviews = await reviewModel.find({ parkingSlot: slotId });
    const totalReviews = reviews.length;
    const averageRating = reviews.reduce((acc, review) => acc + review.rating, 0) / totalReviews;

    slot.rating = averageRating
    slot.totalReviews = totalReviews

    await slot.save();

    res.json({success: true, message: 'Review added successfully' });
    
  } catch (error) {
      res.json({ success: false, message: error.message})
  }
};


// Get all reviews for a parking slot
export const getReviewsBySlot = async (req, res) => {

  try {

    const reviews = await reviewModel.find({ parkingSlot: req.params.slotId }).populate('user', 'name');

    res.json({success: true, reviews});

  } catch (error) {
      res.json({ success: false, message: error.message });
  }
};

// check whether user can review or not
export const canReviewSlot = async (req, res) => {

  try {
    
    const slotId = req.params.slotId;

    const booking = await bookingModel.findOne({ user: req.user._id, slot: slotId, status: "Completed" });

    if (!booking) {
      return res.json({ success: false, message: "You must have a completed booking to review this slot." });
    }

    res.json({ success: true });

  } catch (error) {
      res.json({ success: false, message: error.message})
  }
}