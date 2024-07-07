
import joi from "joi"
import { globalValidation } from "../../middleware/validation.js";

 const signUpVal = joi
 .object({
    firstName: globalValidation.name,
    lastName: globalValidation.name,
    email: globalValidation.email,
    password: globalValidation.password,
    recoveryEmail: globalValidation.email,
    DOB: globalValidation.DOB,
    mobileNumber: globalValidation.mobile,
    role:globalValidation.name
  })
  .required();

  const signInVal = joi
  .object({
    email: globalValidation.email,
    password: globalValidation.password,
    mobileNumber: globalValidation.mobile,
  })
  .required();
export{
    signUpVal,
    signInVal
}