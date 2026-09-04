import express from 'express';
import { ctrlWrapper } from '../utils/ctrlWrapper.js';
import { createReviewController, deleteReviewController, getAllReviewsController, updateReviewController } from '../controllers/reviews.js';
import { isValidId } from '../middlewares/isValidId.js';
import { validateBody } from '../middlewares/validateBody.js';
import { createReviewsSchema, updateReviewsSchema } from '../validation/reviews.js';
import { upload } from '../middlewares/multer.js';

const router = express.Router();

router.get(
    '/',
    ctrlWrapper(getAllReviewsController)
    );

router.delete(
    '/:id',
    isValidId,
    ctrlWrapper(deleteReviewController)
    );

router.post(
    '/',
    upload.single('photo'),
    validateBody(createReviewsSchema),
    ctrlWrapper(createReviewController)
    );

router.patch(
    '/:id',
    isValidId,
    validateBody(updateReviewsSchema),
    ctrlWrapper(updateReviewController)
    );


export default router;
