import jwt from "jsonwebtoken";
import { config } from "dotenv";
config();

export const Auth = async (req, res, next) => {
     // console.log("Before code start");
     const token =
          req.cookies.token ||
          req.body.token ||
          req.header("Authorization")?.replace("Bearer ", "");

     // console.log("Bearer token", token);
     // console.log("After code end");
     try {
          // token is available or not
          if (!token) {
               return res.status(401).json({
                    success: false,
                    message: `Token is not availabel.`,
               });
          }

          try {
               const decode = await jwt.verify(token, process.env.JWT_TOKEN_SECRET);
               // console.log("decode token -> :", decode);
               req.user = decode;
          } catch (error) {
               return res.status(401).json({
                    success: false,
                    message: `Token is Invalid.`,
               });
          }
          next();
     } catch (error) {
          return res.status(500).json({
               success: false,
               message: error.message,
          });
     }
};

// Admin
export const isAdmin = async (req, res, next) => {
     try {
          console.log("code start");
          console.log("Printing AccountType ", req.user.accountType);
          if (req.user.accountType !== "Admin") {
               return res.status(401).json({
                    success: false,
                    message: "This is a protected route for Admin only",
               });
          }
          next();
     } catch (error) {
          return res.status(500).json({
               success: false,
               message: "User role can't be verified, Please try again",
               error: error.message,
          });
     }
};

// Student
export const isStudent = async (req, res, next) => {
     try {
          if (req.user.accountType !== "Student") {
               return res.status(401).json({
                    success: false,
                    message: "This is a protected route for Student only",
               });
          }
          next();
     } catch (error) {
          return res.status(500).json({
               success: false,
               message: "User role can't be verified, Please try again",
               error: error.message,
          });
     }
};

// Instructor
export const isInstructor = async (req, res, next) => {
     try {
          if (req.user.accountType !== "Instructor") {
               return res.status(401).json({
                    success: false,
                    message: "This is a protected route for Instructor only",
               });
          }
          next();
     } catch (error) {
          return res.status(500).json({
               success: false,
               message: "User role can't be verified, Please try again",
               error: error.message,
          });
     }
};
