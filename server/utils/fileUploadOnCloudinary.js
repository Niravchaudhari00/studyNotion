import cloudinary from "cloudinary";
const cloudinaryV2 = cloudinary.v2;

const fileUploadOnCloudinary = async (
  file,
  folder,
  height,
  quelity
) => {
  const options = { folder };
  if (height) options.height = height;
  if (quelity) options.quelity = quelity;

  options.resource_type = "auto";

  return await cloudinaryV2.uploader.upload(file.tempFilePath, options)
};

export default fileUploadOnCloudinary;

export const isFileTypeSupported = (supportType, fileType) => {
  return supportType.includes(fileType)
}
