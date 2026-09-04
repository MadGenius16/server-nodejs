import express from 'express';
import { ctrlWrapper } from '../utils/ctrlWrapper.js';
import { getAllReviewsController } from '../controllers/reviews.js';

const router = express.Router();

router.get('/',ctrlWrapper(getAllReviewsController));

export default router;
