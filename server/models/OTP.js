import { Schema, model } from "mongoose";
import mailSender from "../utils/mailSend.js";
import otpTemplate from "../mail/template/emailVerificationTemplate.js"

const OTPSchema = new Schema({
     email: {
          type: String,
          required: true,
     },
     otp: {
          type: String,
          required: true,
     },
     createdAt: {
          type: Date,
          default: Date.now(),
          expires: 5 * 60,
     },
});

// a function to send a mail

OTPSchema.pre("save", async function (next) {
     await sendVerificationEmail(this.email, this.otp);
     next();
});

async function sendVerificationEmail(email, otp) {
     try {
          const title = "Verification Email From StudyNation";
          const mailResponse = await mailSender(email, title, otpTemplate(otp));
          console.log("response", mailResponse);
     } catch (error) {
          console.log("error occured while seding mails :", error);
          throw error;
     }
}

export default model("OTP", OTPSchema);
