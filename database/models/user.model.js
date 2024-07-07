import { model, Schema } from "mongoose";
import { userRole, userStatus } from "../../src/utils/common/enum.js";

const userSchema = new Schema(
  {
    firstName: {
      type: String,
      required: true,
    },
    lastName: {
      type: String,
      required: true,
    },
    userName: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
    recoveryEmail: String,
    DOB: {
      type: String,
      required: true,
    },
    mobileNumber: {
      type: String,
      required: true,
    },
    role: {
      type: String,
      enum: Object.values(userRole),
      default: userRole.USER,
    },
    status: {
      type: String,
      enum: Object.values(userStatus),
      default: userStatus.OFFLINE,
    },
    comfirmedEmail: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: { updatedAt: false },
    versionKey: false,
  }
);

export const User = model("User", userSchema);
