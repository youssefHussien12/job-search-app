import { Router } from "express";
import { verfiyToken } from "../../middleware/verfiyToken.js";
import { userRole } from "../../utils/common/enum.js";
import {  addJob, applyToJob, deleteJop, getAllJobs, getCompanyJobs, getFilteredJobs, updateJop } from "./jop.controller.js";
import { asyncHandler } from "../../middleware/asyncHandler.js";
import { validate } from "../../middleware/validation.js";
import { addJopVal, updateJopVal } from "./jop.validation.js";


const jopRouter= Router()

jopRouter.use(verfiyToken(userRole.HR))
jopRouter.post('/',validate(addJopVal),asyncHandler(addJob))
jopRouter.put('/:id',validate(updateJopVal),asyncHandler(updateJop))
jopRouter.delete('/:id',asyncHandler(deleteJop))
jopRouter.get("/all-jobs", asyncHandler(getAllJobs));
jopRouter.get("/:id", asyncHandler( getFilteredJobs));
jopRouter.get("/company-jobs/:companyName", asyncHandler(getCompanyJobs));
jopRouter.post("/application", asyncHandler(applyToJob));

export default jopRouter