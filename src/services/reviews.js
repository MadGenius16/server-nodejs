import { ReviewsCollection } from "../db/models/reviews.js";
import { calculatePaginationData } from "../utils/calculatePaginationData.js";

export const getAllReviews = async({
    page=1,
    perPage=12,
    sortBy,
    sortOrder,
}) => {
    const limit = perPage;
    const skip = (page-1) * perPage;
    const reviewsQuery = ReviewsCollection.find();

    const [reviewsCount, reviews] = await Promise.all([
        ReviewsCollection.find().merge(reviewsQuery).countDocuments(),

        reviewsQuery
        .skip(skip)
        .limit(limit)
        .sort({[sortBy]:sortOrder})
        .exec(),
    ]);
    const paginationData = calculatePaginationData(reviewsCount, perPage, page);
    return {
        data: reviews,
        ...paginationData,
    };
};

export const createReview = async (review) => {
    const newReview = await ReviewsCollection.create(review);
    return newReview;
};

export const deleteReview = async (id, userId) => {
    const review = await ReviewsCollection.findOneAndDelete({ _id: id, userId });
    return review;
};

export const updateReview = async (id, userId, payload, options = {}) => {
  const result = await ReviewsCollection.findOneAndUpdate(
    { _id: id, userId },
    payload,
    { new: true, ...options },
  );
  return result;
};

