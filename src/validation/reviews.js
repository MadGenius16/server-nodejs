import Joi from "joi";

export const createReviewsSchema = Joi.object({
    comment:Joi.string().min(5).max(250).required().messages({
        "string.base": "Comment must be a string",
        "string.min": "Comment must be at least 5 characters long",
        "string.max": "Comment must be at most 250 characters long",
        "any.required": "Comment is required",
    }),
})

export const updateReviewsSchema = Joi.object({
    comment:Joi.string().min(5).max(250).messages({
        "string.base": "Comment must be a string",
        "string.min": "Comment must be at least 5 characters long",
        "string.max": "Comment must be at most 250 characters long",
    }),
})

