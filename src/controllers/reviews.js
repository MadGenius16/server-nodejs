import createHttpError from "http-errors";
import { createReview, deleteReview, getAllReviews, updateReview } from "../services/reviews.js";
import { getEnvVar } from "../utils/getEnvVar.js";
import { parsePaginationParams } from "../utils/parsePaginationParams.js";
import { parseSortParams } from "../utils/parseSortParams.js";
import { saveFileToCloudinary } from "../utils/saveFileToCloudinary.js";
import { saveFileToUploadDir } from "../utils/saveFileToUploadDir.js";

export const getAllReviewsController = async(req,res) => {
     const { page, perPage } = parsePaginationParams(req.query);
      const { sortBy, sortOrder } = parseSortParams(req.query);
    const reviews = await  getAllReviews({
        page,
        perPage,
        sortBy,
        sortOrder,
    });
    res.status(200).json({
        status: 200,
        message: 'Successfully found reviews!',
        data: reviews,
    })
};

export const createReviewController = async(req,res) => {
     const photo = req.file;
      let photoUrl;

      if (photo) {
        if (getEnvVar('ENABLE_CLOUDINARY') === 'true') {
          photoUrl = await saveFileToCloudinary(photo);
        } else {
          photoUrl = await saveFileToUploadDir(photo);
        }
      }
      const newReview = {
        ...req.body,
        userId: req.user._id,
        authorName:req.user.name,
        ...(photoUrl && { photo: photoUrl }),
      }
      const review = await createReview(newReview);
      res.status(201).json({
        status: 201,
        message: 'Successfully created review!',
        data: review,
      });
}

export const deleteReviewController = async(req,res) => {
    const { id } = req.params;
    const reviews = await deleteReview(id, req.user._id);
    if(!reviews){
        throw createHttpError(404, "Review not found");
    }
    res.status(204).send();
}

export const updateReviewController = async(req,res) => {
    const {id} = req.params;
   const userId = req.user._id;
   const result = await updateReview(id, userId, req.body);
   if(!result){
    throw createHttpError(404, "Review not found");
   }
   res.status(200).json({
    status: 200,
    message: 'Successfully updated review!',
    data: result,
   });
}
