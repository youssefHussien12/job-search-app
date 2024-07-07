import joi from'joi'
import { globalValidation } from '../../middleware/validation.js'
import { jobLocation, seniorityLevel, workingTime } from '../../utils/common/enum.js'

export const addJopVal = joi.object({
    jobTitle: globalValidation.name,
    jobLocation:joi.string().valid(...Object.values(jobLocation)),
    workingTime:joi.string().valid(...Object.values(workingTime)),
    seniorityLevel:joi.string().valid(...Object.values(seniorityLevel)),
    jobDescription:globalValidation.name,
    technicalSkills:joi.array().items(joi.string()),
    softSkills:joi.array().items(joi.string()),
    companyId:joi.string().hex().length(24).required(),
})

export const updateJopVal = joi.object({
    jobTitle: globalValidation.name,
    jobDescription:globalValidation.name,
    technicalSkills:joi.array().items(joi.string()),
    softSkills:joi.array().items(joi.string()),
})