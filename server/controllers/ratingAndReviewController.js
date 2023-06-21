import RatingAndReview from "../models/RatingAndReview.js";
import Course from "../models/Course.js";
import mongoose from "mongoose";

export const createRating = async (req, res) => {
     try {
          // Fetch the user id from user
          const userId = req.user.id;
          // Fetch the data from req body
          const { rating, review, courseId } = req.body;

          // Check user is enrolled or not
          const courseDetails = await Course.findOne({
               _id: courseId,
               studentEnrolled: {
                    $elemMatch: { $eq: userId },
               },
          });
          if (!courseDetails) {
               return res.status(404).json({
                    success: false,
                    message: `Student is not enrolled in this course.`,
               });
          }

          // User is all ready rating and review given or not
          const allreadyRevied = await RatingAndReview.findOne({
               user: userId,
               course: courseId,
          });
          if (allreadyRevied) {
               return res.status(403).json({
                    success: false,
                    message: `Course is allready reviewed by the user`,
               });
          }

          // create rating and review
          const ratingReview = await RatingAndReview.create({
               rating,
               review,
               course: courseId,
               user: userId,
          });

          // update course details
          const courseDetailsUpdate = await Course.findByIdAndUpdate(
               { _id: courseId },
               {
                    $push: {
                         ratingAndReview: ratingReview._id,
                    },
               },
               { new: true }
          );
          console.log(courseDetailsUpdate);

          //  Return respons
          return res.status(201).json({
               success: true,
               message: `Rating and Review created successfully.`,
               data: ratingReview,
          });
     } catch (error) {
          console.log(error.message);
          return res.status(403).json({
               success: false,
               message: `Internal server error. Please try again.`,
          });
     }
};

// Get average rating

export const getAverageRating = async (req, res) => {
     try {
          //Fetched the courseid from req body
          const { courseId } = req.body;
          // calculate average rating
          const result = await RatingAndReview.aggregate([
               {
                    $match: {
                         course: new mongoose.Types.ObjectId(courseId),
                    },
               },
               {
                    $group: {
                         _id: null,
                         averageRating: { $avg: "$rating" },
                    },
               },
          ]);

          // Return rating
          if (result.length > 0) {
               return res.status(200).json({
                    success: true,
                    averageRating: result[0].averageRating,
               });
          }

          // if rating/review not exsit
          return res.status(200).json({
               success: true,
               message: `Average rating is 0, no rating given till now.`,
               averageRating: 0,
          });
     } catch (error) {
          return res.status(500).json({
               success: false,
               message: `Something went wrong. Please try again`,
          });
     }
};

// Get all rating and review

export const getAllRatingAndReveiw = async (req, res) => {
     try {
          // Fetched the all reviews
          const allReviews = await RatingAndReview.find({})
               .sort({ rating: "desc" })
               .populate({
                    path: "user",
                    select: "firstName lastName email image",
               })
               .populate({ path: "course", select: "courseName" })
               .exec();
          
          if (allReviews.length === 0) {
               return res.status(404).json({
                    success: false,
                    message: `Reviews are not available.`,
               })
          }
          // return respons
          return res.status(200).json({
               success: true,
               message: `All reviews fetched successfully`,
               allReviews
          })
     } catch (error) {
          console.log(error.message);
          return res.status(500).json({
               success: false,
               message: `Unable to fetched review and rating. Please try again`,
          })
      }
};
