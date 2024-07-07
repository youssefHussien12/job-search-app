import joi from "joi"
import { AppError } from "../utils/appError.js"
import { messages } from "../utils/common/messages.js"

export const globalValidation = {
    name: joi.string().min(3).max(40),
    email: joi.string().email(),
    password: joi.string().pattern(new RegExp("^[a-zA-Z0-9]{3,30}$")),
    mobile: joi.string().pattern(new RegExp("^01[0125][0-9]{8}$")),
    DOB: joi.string().pattern(/^(19|20)\d{2}-(0[1-9]|1[0-2])-(0[1-9]|[12]\d|3[01])$/).required().messages(messages.validate),
}
export const validate = (schema) => {
    return (req, res, next) => {
        let data = { ...req.body, ...req.params, ...req.query }
        const { error } = schema.validate(data, { abortEarly: false })
        if (error) {
            let errMsg = error.details.map(err => err.message)
            return next(new AppError(errMsg, 400))
        }
        next()
    }
}