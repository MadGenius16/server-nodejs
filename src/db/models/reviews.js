
import  { model, Schema } from "mongoose";

const reviewsSchema = new Schema({
    userId: {
        type: Schema.Types.ObjectId,
        ref: "users",
        required: true,
    },
    authorName:{
        type: String,
        required:true,
    },
    photo: {
        type: String,
        default:null,
    },
    comment:{
        type:String,
        required:true,
    },
},
{
    timestamps:true,
    versionKey:false,
},
)

export const ReviewsCollection = model("reviews", reviewsSchema)
