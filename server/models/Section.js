import { Schema, model } from "mongoose";

const sectionSchema = new Schema({
     sectionName: { type: String },
     subSection: [
          {
               type: Schema.Types.ObjectId,
               ref: "SubSection",
          },
     ],
});

export default model("Section", sectionSchema);
