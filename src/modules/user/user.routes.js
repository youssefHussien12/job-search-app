import { Router } from "express";
import { deleteProfile, getAccountsByRecoveryEmail, getMyProfile, updataProfile, updatePassword } from "./user.controller.js";
import { verfiyToken } from "../../middleware/verfiyToken.js";
import { validate } from "../../middleware/validation.js";
import { updatedProfileVal } from "./user.validatin.js";
import { asyncHandler } from "../../middleware/asyncHandler.js";

const userRouter = Router()

userRouter.use(verfiyToken)
userRouter.route('/').get(asyncHandler(getMyProfile)).delete(asyncHandler(deleteProfile)).put(validate(updatedProfileVal),asyncHandler( updataProfile)).patch(asyncHandler(updatePassword))
userRouter.get('/recoveryEmail',asyncHandler(getAccountsByRecoveryEmail))

export default userRouter