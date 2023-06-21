import Course from "../models/Course.js";
import User from "../models/User.js";
import Category from "../models/Category.js";
import fileUploadOnCloudinary, {
     isFileTypeSupported,
} from "../utils/fileUploadOnCloudinary.js";
import { config } from "dotenv";
config();

// Course create
export const createCourse = async (req, res) => {
     try {
          // Get the user id
          const userId = req.user.id;
          // fetch the data from req body
          let {
               courseName,
               courseDescription,
               whatYouWillLearn,
               price,
               category,
               tag,
               status,
               instructions,
          } = req.body;
          const thumbnail = req.files.thumbnailImage;

          // validation for all field required
          if (
               !courseName ||
               !courseDescription ||
               !whatYouWillLearn ||
               !price ||
               !category ||
               !thumbnail ||
               !tag 
          ) {
               return res.status(400).json({
                    success: false,
                    message: `All field are required. Please fill the all field`,
               });
          }

          // check status
          if (!status || status == undefined) {
               status = "Draft";
          }
          // Check the instructor details are available or not
          const isInstructor = await User.findById(userId);
          if (!isInstructor) {
               return res.status(404).json({
                    success: false,
                    message: `Instructor details is not available`,
               });
          }

          // Check if the tag given is valid
          const isCategory = await Category.findById(category);
          if (!isCategory) {
               return res.status(404).json({
                    success: false,
                    message: `Category details not found`,
               });
          }
          // Support file type
          const supportFileType = ["jpg", "jpeg", "png"];
          const fileType = thumbnail.name.split(".")[1].toLowerCase();
          if (!isFileTypeSupported(supportFileType, fileType)) {
               return res.status(401).json({
                    success: false,
                    message: `This file type can't supported. Only can support jpg,jpeg and png`,
               });
          }
          // upload thumbnail in cloudinary
          const thumbnailImage = await fileUploadOnCloudinary(
               thumbnail,
               process.env.CLOUD_FOLDER_NAME
          );
          console.log(`thumbnailImage => ${thumbnailImage}`);

          // create a course in db
          const saveCourse = await Course.create({
               instructor: isInstructor._id,
               courseName,
               courseDescription,
               whatYouWillLearn,
               price,
               tag,
               category: isCategory._id,
               thumbnail: thumbnailImage.secoure_url,
               status: status,
               instructions,
          });

          // add the new couser in the user schema to Instructor
          await User.findByIdAndUpdate(
               { _id: isInstructor._id },
               {
                    $push: {
                         courses: saveCourse._id,
                    },
               },
               { new: true }
          );

          // HW : Done
          // add the new couser in the category schema
          await Category.findByIdAndUpdate(
               { _id: isInstructor._id },
               { $push: { courses: saveCourse._id } },
               { new: true }
          );

          // return respons
          return res.status(201).json({
               success: true,
               message: `Course created successfully`,
               data: saveCourse,
          });
     } catch (error) {
          return res.status(500).json({
               success: false,
               message: `Failed to create course. Please try again`,
               error: error.message,
          });
     }
};

// Get all course
export const getAllCourses = async (req, res) => {
     try {
          //   todo : change the below statement incrementally
          const allCouser = await Course.find(
               {},
               {
                    courseName: true,
                    price: true,
                    instructor: true,
                    thumbnail: true,
                    ratingAndReview: true,
                    studentsEnrolled: true,
               }
          )
               .populate("instructor")
               .exec();
          // return respons
          return res.status(200).json({
               success: true,
               message: `showing all couseres`,
               data: allCouser,
          });
     } catch (error) {
          return res.status(500).json({
               success: false,
               message: `Error occurred while fetching all courses. Please try again`,
               error: error.message,
          });
     }
};

// Get course Details
export const getCourseDetails = async (req, res) => {
     try {
          // Fetch the exesiting user details
          const userDetails = req.user.id;   
          if (!userDetails) {
               return res.status(400).json({
                    success: false,
                    messaga: `User Details Not Found`,
               });
          }
          // Fetch the course id
          const { courseId } = req.body;
          // console.log(`course id -> ${courseId}`);
          const courseDetails = await Course.findOne({ _id: courseId })
               .populate({
                    path: "instructor",
                    populate: {
                         path: "additionalDetails",
                    },
               })
               .populate("category")
               // .populate("ratingAndReview")
               .populate({
                    path: "courseContent",
                    populate: {
                         path: "subSection",
                    },
               })
               .exec();

          if (!courseDetails) {
               return res.status(404).json({
                    success: false,
                    messaga: `Not found course details.`
               })
          }
          // Return respons
          return res.status(200).json({
               success: true,
               messaga: `Course details fetched successfully.`,
               data: courseDetails
          })

     } catch (error) {
          console.log(error.message);
          return res.status(500).json({
               success: false,
               messaga: `Error occurred while fetching the course details. Please try again`,
               error: error.message
          })
     }
};
