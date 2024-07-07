import { Router } from "express";
import { signIn, signUp, verifyAccount } from "./auth.controller.js";
import { validate } from "../../middleware/validation.js";
import { signInVal, signUpVal } from "./auth.validation.js";
import { asyncHandler } from "../../middleware/asyncHandler.js";


const authRouter=Router()

authRouter.post('/signup',validate(signUpVal),asyncHandler(signUp))
authRouter.get('/verify/:token',asyncHandler(verifyAccount))
authRouter.post('/sign-in',validate(signInVal),asyncHandler(signIn))


export default authRouter