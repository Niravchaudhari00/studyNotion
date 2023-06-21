import { Schema, model } from "mongoose";

const courseSchema = new Schema({
     courseName: {
          type: String,
          trim: true,
     },
     courseDescription: {
          type: String,
          trim: true,
     },
     instructor: {
          type: Schema.Types.ObjectId,
          ref: "User",
          required: true,
     },
     whatYouWillLearn: { type: String },
     courseContent: [
          {
               type: Schema.Types.ObjectId,
               ref: "Section",
          },
     ],
     ratingAndReview: [
          {
               type: Schema.Types.ObjectId,
               ref: "RatingAndReview",
          },
     ],
     price: { type: Number },
     thumbnail: { type: String },
     tag: {
          type: [String],
          required: true

     },
     category: {
          type: Schema.Types.ObjectId,
          ref: "Category",
     },
     studentsEnrolled: {
          type: Schema.Types.ObjectId,
          ref: "User",
     },
     instructions: { type: [String] },
     status: {
          type: String,
          enum: ["Draft", "Published"]
     }
});

export default model("Course", courseSchema);
