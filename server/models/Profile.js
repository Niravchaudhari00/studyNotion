import { Schema, model } from "mongoose";

const profileSchema = new Schema({
     gender: {
          type: String,
          // required: true,
     },
     dateOfBirth: {
          type: String,
     },
     about: {
          type: String,
          trim: true,
     },
     contactNumber: {
          type: Number,
          trim: true,
     },
});

export default model("Profile", profileSchema);
