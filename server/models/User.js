import { Schema, model } from "mongoose";
import validator from "validator";

const userSchema = new Schema(
     {
          firstName: {
               type: String,
               trim: true,
               required: true,
          },
          lastName: {
               type: String,
               trim: true,
               required: true,
          },
          email: {
               type: String,
               required: true,
               unique: true,
               validate: [validator.isEmail, "Please enter valid email"],
               trim: true,
          },
          password: {
               type: String,
               required: true,
          },
          accountType: {
               type: String,
               required: true,
               enum: ["Admin", "Student", "Instructor"],
          },
          active: {
               type: Boolean,
               default: true,
          },
          approved: {
               type: Boolean,
               default: true,
          },
          image: {
               type: String,
               required: true,
          },
          additionalDetails: {
               type: Schema.Types.ObjectId,
               ref: "Profile",
               required: true,
          },
          token: { type: String },
          resetPasswordExpires: { type: Date },
          courses: [
               {
                    type: Schema.Types.ObjectId,
                    ref: "Course",
               },
          ],
          courseProgress: [
               {
                    type: Schema.Types.ObjectId,
                    ref: "CourseProgress",
               },
          ],
     },
     { timestamps: true }
);

export default model("User", userSchema);
