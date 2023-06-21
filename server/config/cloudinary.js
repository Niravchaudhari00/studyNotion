import cloudinary from "cloudinary"
import { config } from "dotenv"
config()
const cloudinaryV2 = cloudinary.v2

export const connectCloudinary = async () => {
     try {
          cloudinaryV2.config({
               cloud_name: process.env.API_NAME,
               api_key: process.env.API_KEY,
               api_secret: process.env.API_SECRET
          })
          // console.log(`cloudinary connected`);
     } catch (error) {
          console.log(error.message);
          console.log("cloudinary connect fail");
     }
} 