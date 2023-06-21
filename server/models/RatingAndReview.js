import { Schema, model } from "mongoose";

const ratingAndReview = new Schema({
     user: {
          type: Schema.Types.ObjectId,
          ref: "User",
          required: true,
     },
     rating: {
          type: Number,
          required: true
     },
     review: {
          type: String,
          required: true
     }
});

export default model("RatingAndReview", ratingAndReview);
