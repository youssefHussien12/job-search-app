import joi from 'joi'
import { globalValidation } from '../../middleware/validation.js'

export const updatedProfileVal = joi.object({
    email:globalValidation.email ,
    mobileNumber:globalValidation.mobile,
    recoveryEmail:globalValidation.email ,
    DOB: globalValidation.DOB,
    lastName: globalValidation.name,
    firstName:globalValidation.name 
})