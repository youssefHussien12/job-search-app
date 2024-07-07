import { model, Schema } from "mongoose";

const applicationSchema = new Schema(
  {
    jobId: {
      type: Schema.Types.ObjectId,
      ref: "Job",
      required: true,
    },
    userId: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    userTechSkills:[String],
    userSoftSkills:[String],
    appliedAt:{
      type:Date
    }
  },
  {
    timestamps: { updatedAt: false },
    versionKey: false,
  }
);

export const Application = model("Application", applicationSchema);
