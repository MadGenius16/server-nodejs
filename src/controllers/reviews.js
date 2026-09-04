import { getAllReviews } from "../services/reviews";

export const getAllReviewsController = async(req,res) => {
    const reviews = await  getAllReviews();
    req.status(200).json({
        status: 200,
        message: 'Successfully found reviews!',
        data: reviews,
    })
};
