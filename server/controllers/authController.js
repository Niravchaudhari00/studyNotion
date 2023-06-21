import otpGenerator from "otp-generator";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { config } from "dotenv";
config();

import User from "../models/User.js";
import OTP from "../models/OTP.js";
import Profile from "../models/Profile.js";
import mailSender from "../utils/mailSend.js";
import { passwordUpdate } from "../mail/template/passwordUpdate.js";

// Register user
export const signUp = async (req, res) => {
     try {
          // Fetch the data from req body
          const {
               firstName,
               lastName,
               email,
               password,
               confirmPassword,
               accountType,
               contactNumber,
               otp,
          } = req.body;

          // validiation
          if (
               !firstName ||
               !lastName ||
               !email ||
               !password ||
               !confirmPassword ||
               !accountType ||
               !otp
          ) {
               return res.status(401).json({
                    success: false,
                    message: "All field are required.",
               });
          }

          // password and confirm password is macth or not
          if (password !== confirmPassword) {
               return res.status(400).json({
                    success: false,
                    message:
                         "Password and confirm password dose not match. Please try again.",
               });
          }
          // user is already exists or not
          const existingUser = await User.findOne({ email });
          if (existingUser) {
               return res.status(401).json({
                    success: false,
                    message: "User is already registered",
               });
          }

          // find most recent OTP stored for the user
          const respons = await OTP.find({ email }).sort({ createdAt: -1 }).limit(1);
          console.log(`recent otp -> `, respons);
          if (respons.length === 0) {
               // Not found otp
               return res.status(400).json({
                    success: false,
                    message: "The OTP is not found",
               });
          } else if (otp !== respons[0].otp) {
               // invalid otp
               return res.status(400).json({
                    success: false,
                    message: "OTP Invalid",
               });
          }

          // Hasing th password
          const encrypPassword = await bcrypt.hash(password, 10)

          // Create a user
          let approved = "";
          approved === "Instructor" ? (approved = false) : (approved = true);

          // Create the Profile for Additional Details
          const profileDetails = await Profile.create({
               geneder: null,
               dateOfBirth: null,
               about: null,
               contactNumber: null,
          });


          // Create a user
          const user = await User.create({
               firstName,
               lastName,
               email,
               contactNumber,
               password: encrypPassword,
               accountType: accountType,
               additionalDetails: profileDetails._id,
               approved: approved,
               image: `https://api.dicebear.com/6.x/initials/svg?seed=${firstName} ${lastName}`,
          });

          // send response
          res.status(201).json({
               success: true,
               message: "User registere successfully.",
               data: user,
          });
     } catch (error) {
          return res.status(500).json({
               success: false,
               message: "User can't bee registerd. Please try again.",
               error: error.message,
          });
     }
};

// User login for authentication
export const logIn = async (req, res) => {
     try {
          // Fetch the data from body
          const { email, password } = req.body;

          // All field are required
          if (!email || !password) {
               return res.status(403).json({
                    success: false,
                    message: "Please fill up all the requires fields",
               });
          }

          // Find the user
          const user = await User.findOne({ email });
          if (!user) {
               return res.status(401).json({
                    success: false,
                    message: "User is not registered whith us please SignUp to continue",
               });
          }


          //Compare password and Generet JWT Token
          if (await bcrypt.compare(password, user.password)) {
               // create a payload for sent the user info in JWT token
               const payload = {
                    email: user.email,
                    id: user._id,
                    accountType: user.accountType,
               };
               // Token
               const token = jwt.sign(payload, process.env.JWT_TOKEN_SECRET, {
                    expiresIn: process.env.JWT_TOKEN_EXPIRE,
               });

               user.token = token;
               user.password = undefined;

               // send cookie
               const options = {
                    expires: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000),
                    httpOnly: true,
               };

               res.status(200).cookie("token", token, options).json({
                    success: true,
                    message: "Logged In Successfully.",
                    user,
               });
          } else {
               return res.status(401).json({
                    success: false,
                    message: "Username and Password Incorret. Please try again",
               });
          }

     } catch (error) {
          return res.status(500).json({
               success: false,
               message: "Login failed. Please try again.",
               error: error.message,
          });
     }
};

// Send otp verify the email
export const sendOtp = async (req, res) => {
     try {
          // Fetch the email from req body
          const { email } = req.body;
          // Check the user is all ready registered or not
          const existingUser = await User.findOne({ email });
          if (existingUser) {
               return res.status(401).json({
                    success: false,
                    message: "User is allready registered this email. Please try to another email",
               });
          }

          // bed code you can improve this code please search the internet and better approached impliment
          let otp = otpGenerator.generate(6, {
               lowerCaseAlphabets: false,
               upperCaseAlphabets: false,
               specialChars: false,
          });
          console.log("otp", otp);
          let result = await OTP.findOne({ otp: otp });
          console.log(`find otp in db -> ${result}`);
          while (result) {
               otp = otpGenerator.generate(6, {
                    upperCaseAlphabets: false,
               });
          }
          console.log(`otp result ->`, result);
          // end bed code

          // save otp in db
          const otpBody = await OTP.create({ email, otp });
          console.log("created db -> ", otpBody);

          res.status(200).json({
               success: true,
               message: "OTP sent successfully",
               otp,
          });
     } catch (error) {
          console.log(error.message);
          return res.status(500).json({
               success: false,
               message: "Internel Server Error. Please Try again",
               error: error.message,
          });
     }
};

// Change the password
export const changePassword = async (req, res) => {
     try {
          const userDetails = await User.findOne({ _id: req.user.id });
          // Fetch the data from req body
          const { oldPassword, newPassword, confirmPassword } = req.body;
          // Validate old password
          const isMatchPassword = await bcrypt.compare(
               oldPassword,
               userDetails.password
          );
          if (!isMatchPassword) {
               // If old password does not match, return a 401 (Unauthorized) error
               return res.status(401).json({
                    success: false,
                    message: `The password is incorrect. Please try again`,
               });
          }
          // Match new password and confirm new password
          if (newPassword !== confirmPassword) {
               return res.status(401).json({
                    success: false,
                    message: `The password and confirm password does not match. Please try again`,
               });
          }
          // Hass password
          const encrypPassword = await bcrypt.hash(newPassword, 10);
          // Update password
          const updatePassword = await User.findByIdAndUpdate(
               { _id: req.user.id },
               {
                    $push: {
                         password: encrypPassword,
                    },
               },
               { new: true }
          );
          // Send notification email
          try {
               const emailRespons = await mailSender(
                    updatePassword.email,
                    passwordUpdate(
                         updatePassword.email,
                         `Password update succesfully ${updatePassword.firstName} ${updatePassword.lastName}`
                    )
               );
               console.log("email respons = > ", emailRespons);
          } catch (error) {
               // error occurred while sending a mail
               console.log(error.message);
               return res.status(500).json({
                    success: false,
                    message: `Error occurred while sending a email`,
               });
          }

          // return respons
          return res.status(200).json({
               success: false,
               message: `Password updated successfully.`,
          });
     } catch (error) {
          console.log(error.message);
          return res.status(500).json({
               success: false,
               message: `Error occurred while update password.`,
          });
     }
};

// logout
export const logOut = async (req, res) => {
     try {
          res
               .cookie("token", null, {
                    expires: new Date(Date.now()),
                    httpOnly: true,
               })
               .status(200)
               .json({
                    success: true,
                    message: "Logged Out Successfully",
               });
     } catch (error) {
          return res.status(500).json({
               success: false,
               message: "Failed Logged Out. Please try again.",
               error: error.message,
          });
     }
};
