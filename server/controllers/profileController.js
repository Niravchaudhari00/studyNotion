import User from "../models/User.js";
import Profile from "../models/Profile.js";
import fileUploadOnCloudinary, {
     isFileTypeSupported,
} from "../utils/fileUploadOnCloudinary.js";

// update profile
export const updateProfile = async (req, res) => {
     try {
          // fetch the data
          const {
               firstName = "",
               lastName = "",
               gender = "",
               dateOfBirth = "",
               about = "",
               contactNumber,
          } = req.body;

          const userId = req.user.id;

          // Find the profile by id
          const userDetails = await User.findByIdAndUpdate(userId, {
               firstName,
               lastName,
          });

          await Profile.findByIdAndUpdate(
               userDetails.additionalDetails,
               {
                    gender,
                    dateOfBirth,
                    contactNumber,
                    about,
               });
          
          const updateUserDetails = await User.findById(userId)
               .populate("additionalDetails")
               .exec();

          // return resposn
          return res.status(200).json({
               success: true,
               message: `Profile update successfully`,
               updateUserDetails,
          });
     } catch (error) {
          return res.status(500).json({
               success: false,
               message: `Profile update failed. Please try again.`,
               error: error.message,
          });
     }
};

// Get the all users
export const getUserDetails = async (req, res) => {
     try {
          // Get the user id
          const id = req.user.id;

          const allUserDetails = await User.findById({ _id: id })
               .populate("additionalDetails")
               .exec();
          // Chech the user is available or not
          if (!allUserDetails) {
               return res.status(404).json({
                    success: false,
                    message: `User not found.`,
               });
          }

          // return respons
          return res.status(200).json({
               success: true,
               message: `User data fetched successfully.`,
               data: allUserDetails,
          });
     } catch (error) {
          return res.status(500).json({
               success: true,
               message: `Unable to fetch all user details. Please try again`,
               error: error.message,
          });
     }
};

// User account delete
export const deleteAccount = async (req, res) => {
     try {
          // Get the user id
          const userId = req.user.id;
          // Check the user is availabel or not
          const user = await User.findById({ _id: userId });
          if (!user) {
               return res.status(404).json({
                    success: false,
                    message: `User not found`,
               });
          }

          // Delete profile
          await Profile.findByIdAndDelete({ _id: user.additionalDetails });
          // TODO : HW unenrolled user from all enrolled course
          // user delete
          await User.findByIdAndDelete({ _id: userId });

          return res.status(200).json({
               success: true,
               message: `User delete success`,
          });
     } catch (error) {
          return res.status(500).json({
               success: false,
               message: `User can't be deleted. Please try again`,
               error: error.message,
          });
     }
};

// Update the display picture
export const updateDisplayPicture = async (req, res) => {
     try {
          // Fetch the image file
          const displayPicture = req.files.dpFile;
          // console.log("desplay picture >",displayPicture);
          // console.log(displayPicture.name.split('.')[1]);
          const userId = req.user.id;
          // check file types
          const supportFileType = ["jpg", "jpeg", "png"];
          const fileType = displayPicture.name.split(".")[1].toLowerCase();
          console.log(fileType);
          if (!isFileTypeSupported(supportFileType, fileType)) {
               return res.status(400).json({
                    success: false,
                    message: `This file type not supported. Please select the jpg,jpeg and png file are supported`,
               });
          }

          const image = await fileUploadOnCloudinary(
               displayPicture,
               process.env.CLOUD_FOLDER_NAME,
               1000,
               1000
          );
          // console.log(`upload display pic -> ${image.public_id}`);
          // update display image
          const updateDisplayPicture = await User.findByIdAndUpdate(
               { _id: userId },
               { image: image.secure_url },
               { new: true }
          );

          // return respon
          return res.status(200).json({
               success: true,
               message: `display picture update successfully`,
               data: updateDisplayPicture,
          });
     } catch (error) {
          return res.status(500).json({
               success: false,
               message: `Unable to update dipslay picture. Please try again.`,
               error: error.message,
          });
     }
};

// Get User Enrolled Course
export const getUserEnrolledCourse = async (req, res) => {
     try {
          // Fetcht the userid
          const userId = req.user.id;
          const userDetails = await User.findOne({ _id: userId })
               .populate("courses")
               .exec();
          // Check wheather user is enrolled course or not
          if (!userDetails) {
               return res.status(404).json({
                    success: false,
                    message: `could not find user with this id ${userDetails}`,
               });
          }

          return res.status(200).json({
               success: true,
               data: userDetails,
          });
     } catch (error) {
          return res.status(500).json({
               success: false,
               message: `Error occurred while fetched the enrolled user details. Please try again.`,
               error: error.message,
          });
     }
};
