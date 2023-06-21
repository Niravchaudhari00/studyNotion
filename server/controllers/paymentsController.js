import mongoose from "mongoose";
import instance from "../config/razorpay.js";
import Course from "../models/Course.js";
import { config } from "dotenv";
import { createHmac } from "crypto";
import User from "../models/User.js";
import mailSender from "../utils/mailSend.js";
config();

export const capturePayment = async (req, res) => {
     try {
          // Feth the courseId and userId details
          const { courseId } = req.body;
          const userId = req.user.id;

          // Validation
          // Check the courseId is correct or not
          if (!courseId) {
               return res.json({
                    success: false,
                    message: `Please provide valid course id.`,
               });
          }
          // Valid course details
          let course;
          try {
               course = await Course.findById({ courseId });
               if (!course) {
                    return res.status(404).json({
                         success: false,
                         message: `Course details not found.`,
                    });
               }

               // User already pay for the same course
               const uid = new mongoose.Types.ObjectId(userId);
               if (course.studentEnrolled.includes(uid)) {
                    return res.status(200).json({
                         success: false,
                         message: `Student is allready enrolled.`,
                    });
               }
          } catch (error) {
               console.log(error.message);
               return res.status(500).json({
                    success: false,
                    message: `Something went wrong. Please try again`,
               });
          }
          // Order create
          const amount = course.price;
          const currency = "INR";

          // options
          const options = {
               amount: amount * 100,
               currency,
               receipt: Math.random(Date.now()).toString(),
               notes: {
                    courseId,
                    userId,
               },
          };
          // initiate the payment order
          const paymentRespons = await instance.orders.create(options);
          console.log("Payment respons", paymentRespons);

          // Return respons
          return res.status(200).json({
               courseName: course.courseName,
               description: course.courseDescription,
               thumnail: course.thumbnail,
               orderId: paymentRespons.id,
               currency: paymentRespons.currency,
               amount: paymentRespons.amount,
          });
     } catch (error) {
          return res.status(500).json({
               success: false,
               message: `Could not initiate order. Please try again after few minutes`,
          });
     }
};

// Verify singature razorpay and server
export const verifySignature = async (req, res) => {
     const webhookSecret = process.env.WEB_HOOK_SECRET;
     // Fetch the singnature from req header
     const signature = req.headers["x-razorpay-singnature"];

     //sha256 algo ad
     const shaSum = createHmac("sha256", webhookSecret);
     shaSum.update(JSON.stringify(req.body));
     const digest = shaSum.digest("hex");

     if (signature === digest) {
          console.log(`payment is Authorized`);
          const { courseId, userId } = req.body.payload.payment.entity.notes;
          try {
               // Find the course and enroll the student in it
               const enrolledCourse = await Course.findByIdAndUpdate(
                    { courseId },
                    { $push: { studentEnrolled: userId } },
                    { new: true }
               );

               if (!enrolledCourse) {
                    return res.status(404).json({
                         success: true,
                         message: `Course not found`,
                    });
               }

               // Find the student and add the course to their list enrolled courses me
               const enrolleStudent = await User.findByIdAndUpdate(
                    { userId },
                    { $push: { courses: courseId } },
                    { new: true }
               );
               console.log(`enroll student ${enrolleStudent}`);

               // Send mail to course
               const emailSendRespons = await mailSender(
                    enrolleStudent.email,
                    `Congratulation from StudyNation`,
                    `Congratulation, you are on board into new course`
               );

               console.log(`mail respons : ${emailSendRespons}`);

               // return respons
               return res.status(200).json({
                    success: true,
                    message: `Singnature verified and course add in our dashboard`,
               });
          } catch (error) {
               return res.status(500).json({
                    success: false,
                    message: `Internal server error. Please try again`,
               });
          }
     } else {
          return res.status(400).json({
               success: false,
               message: `Invalid request.`,
          });
     }
};
