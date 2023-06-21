import Section from "../models/Section.js";
import SubSection from "../models/SubSection.js";
import fileUploadOnCloudinary, {
     isFileTypeSupported,
} from "../utils/fileUploadOnCloudinary.js";

// create sub section
export const subSectionCreate = async (req, res) => {
     try {
          // Fetch the data from request body
          const { title, description, sectionId } = req.body;
          const video = req.files.videoFile;

          // Validation
          if (!title || !description || !video || !sectionId) {
               return res.status(400).json({
                    success: false,
                    message: `All field are required. Please try again`,
               });
          }

          // File type verify
          const supportType = ["mp4", "mov", "webm"];
          const fileTpye = video.name.split(".")[1].toLowerCase();
          if (!isFileTypeSupported(supportType, fileTpye)) {
               return res.status(400).json({
                    success: false,
                    message: `This file type is not supported. Please try again`,
               });
          }

          // Upload video file
          const videoFile = await fileUploadOnCloudinary(
               video,
               process.env.CLOUD_FOLDER_NAME
          );

          // Create a new sub-section with the necessary information
          const subSectionDetails = await SubSection.create({
               title: title,
               timeDuration: videoFile.duration.toFixed(2),
               description: description,
               videoUrl: videoFile.secure_url,
          });

          // populate sub section fron Section schema
          const updateSection = await Section.findByIdAndUpdate(
               { _id: sectionId },
               { $push: { subSection: subSectionDetails._id } },
               { new: true }
          )
               .populate("subSection")
               .exec();

          // return respons
          return res.status(201).json({
               success: true,
               message: `Sub section create successfully`,
               data: updateSection,
          });
     } catch (error) {
          return res.status(500).json({
               success: false,
               message: `Unable to create sub-section. Please try again.`,
               error: error.message,
          });
     }
};

// update sub section
export const updateSubSection = async (req, res) => {
     try {
          // fetch the data
          const { title, description, subSectionId } = req.body;
          const video = req.files.videoFile;
          const subSection = await SubSection.findById({ _id: subSectionId });
          if (!subSection) {
               return res.status(404).json({
                    success: false,
                    message: `Sub Section Not Found.`,
               });
          }

          if (title !== undefined) {
               subSection.title = title;
          }
          if (description !== undefined) {
               subSection.description = description;
          }

          if (req.files && req.files.videoFile === undefined) {
               
               const supportType = ["mp4", "mov", "webm"];
               const fileTpye = video.name.split(".")[1].toLowerCase();
               // File validation
               if (!isFileTypeSupported(supportType, fileTpye)) {
                    return res.status(400).json({
                         success: false,
                         message: `File type is not supported. Please try again`,
                    });
               }

               const uploadDetails = await fileUploadOnCloudinary(
                    video,
                    process.env.CLOUD_FOLDER_NAME
               );

               subSection.videoUrl = uploadDetails.secour_url;
               subSection.timeDuration = `${uploadDetails.duration.toFixed(2)}`;
          }

          // save the sub section
          await subSection.save();

          // return respons
          return res.status(201).json({
               success: true,
               message: `Update sub section successfully`,
               data: updateSubSection,
          });
     } catch (error) {
          return res.status(500).json({
               success: false,
               message: `Unable to update sub section. Please try again`,
               error: error.message,
          });
     }
};

// delete sub section
export const deleteSubSection = async (req, res) => {
     try {
          const { subSectionId, sectionId } = req.body;

          // First to pull the sub section id db
          await Section.findByIdAndUpdate(
               { _id: sectionId },
               {
                    $pull: {
                         subSection: subSectionId,
                    },
               }
          );

          // Delete the sub section
          const sub_section = await SubSection.findByIdAndDelete({
               _id: subSectionId,
          });
          // section is available or not
          if (!sub_section) {
               return res.status(400).json({
                    success: false,
                    message: `Sub section not found`,
               });
          }

          // return respons
          return res.status(200).json({
               success: true,
               message: `Delete sub section successfully`,
          });
     } catch (error) {
          return res.status(500).json({
               success: false,
               message: `Unable to delete sub section. Please try again`,
               error: error.message,
          });
     }
};
