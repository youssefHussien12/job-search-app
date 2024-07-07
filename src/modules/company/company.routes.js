import { Router } from "express";
import { addCompany, deleteCompany, getCompanyData, updateCompany } from "./company.controller.js";
import { verfiyToken } from "../../middleware/verfiyToken.js";
import { userRole } from "../../utils/common/enum.js";
import { CompanyVal } from "./company.validatin.js";
import { validate } from "../../middleware/validation.js";
import { asyncHandler } from "../../middleware/asyncHandler.js";

const companyRouter = Router()

companyRouter.use(verfiyToken(userRole.HR))
companyRouter.post('/', validate(CompanyVal) ,asyncHandler(addCompany))
companyRouter.put('/',validate(CompanyVal),asyncHandler(updateCompany))
companyRouter.delete('/',asyncHandler(deleteCompany))
companyRouter.get('/:id',asyncHandler(getCompanyData))

export default companyRouter