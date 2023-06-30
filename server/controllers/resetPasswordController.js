import mailSend from "../utils/mailSend.js";
import User from "../models/User.js";
import crypt from "crypto";
import bcrypt from "bcryptjs";
import { resetPasswordTemplate } from "../mail/template/resetPassword.js";
import { config } from "dotenv";
config();
export const resetPasswordToken = async (req, res) => {
     try {
          // Fetch the username
          const { email } = req.body;
          const user = await User.findOne({ email });
          if (!user) {
               return res.json({
                    success: false,
                    message: `This email : ${email} is not registered with us. Please Enter a valid email`,
               });
          }
          // Generate token using crypt using url
          const token = crypt.randomBytes(20).toString("hex");
          console.log(token);
          const updateDetails = await User.findOneAndUpdate(
               { email: email },
               {
                    token: token,
                    resetPasswordExpires: new Date(Date.now() + 6 * 60 * 1000),
               },
               { new: true }
          );
          const url = process.env.URL_RESET_PASSWORD_TOKEN + `/${token}`;
          await mailSend(
               email,
               `Password Reset of studyNation`,
               resetPasswordTemplate(url)
          );

          return res.status(200).json({
               success: true,
               message: `Email sent successfully. Please check your email and reset password.`,
               updateDetails,
          });
     } catch (error) {
          return res.status(500).json({
               success: true,
               message: `Error occurred while sending reset password mail`,
          });
     }
};

// Reset password
export const resetPassword = async (req, res) => {
     try {
          // Fetch the data from body
          const { password, confirmPassword, token } = req.body;

          // Verify the field are filling or not
          if (!password || !confirmPassword || !token) {
               return res.status(401).json({
                    success: false,
                    message: "All field are required",
               });
          }

          // Password and confirm password verify
          if (password !== confirmPassword) {
               return res.status(401).json({
                    success: false,
                    message: "password are not match. Please try again",
               });
          }

          // Find user
          const userDetails = await User.findOne({ token: token });
          if (!userDetails) {
               return res.json({
                    success: false,
                    message: "invalid token",
               });
          }

          // Token expire

          if (!(userDetails.resetPasswordExpires > Date.now())) {
               return res.json({
                    success: false,
                    message: "Token is expired. Please re-generate your token",
               });
          }

          // encyrpt password
          const encryptPassword = await bcrypt.hash(password, 10);
          console.log(encryptPassword);
          // update password
          await User.findOneAndUpdate(
               { token: token },
               { password: encryptPassword },
               { new: true }
          );

          // return response
          return res.status(200).json({
               success: true,
               message: `password reset successfully`,
          });
     } catch (error) {
          console.log(error.message);
          return res.status(500).json({
               success: false,
               message: `Error occurred while reste the password. Please try again`,
          });
     }
};
