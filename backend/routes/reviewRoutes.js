import express from 'express'
import { userAuth } from '../middleware/userAuth.js'
import { canReviewSlot, createReview, getReviewsBySlot } from '../controllers/reviewController.js'

const reviewRouter = express.Router();

reviewRouter.post('/:slotId', userAuth, createReview);

reviewRouter.get('/:slotId', getReviewsBySlot);

reviewRouter.get('/can-review/:slotId', userAuth, canReviewSlot);


export default reviewRouter;