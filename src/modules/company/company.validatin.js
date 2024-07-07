import joi from 'joi'
import { globalValidation } from '../../middleware/validation.js'


export const CompanyVal = joi.object({
    companyName:globalValidation.name ,
    description:globalValidation.name ,
    industry: globalValidation.name,
    address:globalValidation.name,
    numberOfEmployees: joi.number().min(11).max(22).required(),
    companyEmail: globalValidation.email
}).required()
