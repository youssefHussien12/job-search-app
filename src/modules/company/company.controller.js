import { Company } from "../../../database/models/company.model.js"
import { Job } from "../../../database/models/job.model.js"
import { AppError } from "../../utils/appError.js"
import { messages } from "../../utils/common/messages.js"

// add Company
const addCompany = async (req, res, next) => {
    let { companyName, description, industry, address, numberOfEmployees, companyEmail, companyHR } = req.body
    const isExist = await Company.findOne({ companyName });
    if (isExist) {
      return next(new AppError(messages.company.wrongName, 400));
    }
    const comapny = new Company({
        companyName,
        description,
        industry,
        address,
        numberOfEmployees,
        companyEmail,
        companyHR: req.user.id
    })

    await comapny.save()
    return res.status(201).json({ message: messages.company.companyCreated, data: comapny })
}

// Update company
const updateCompany = async (req, res, next) => {
    // Get company details from req
    const {companyName, description, industry,address,numberOfEmployees,companyEmail, } = req.body;
    
    // Check if company exists
    const isExist = await Company.findOne({ companyName });
    if (isExist) {
      return next(new AppError(messages.company.wrongName, 400));
    }
    
    // Check if current user is the owner of the company
    if (String(isExist.companyHR) !== String(req.user.id)) {
      return next(new AppError(messages.company.NotAuthorized, 401));
    }
    
    // Update company
    const updatedCompany = await Company.findOneAndUpdate(
      { companyName },
      {
        companyName,
        description,
        industry,
        address,
        numberOfEmployees,
        companyEmail,
      },
      { new: true } // This option ensures the updated document is returned
    );
    // Send response
    return res.status(200).json({
      message: messages.company.companyUpdated,
      success: true,
      data: updatedCompany,
    });
};


// delete company
const deleteCompany = async(req,res,next)=>{
    const {companyName} = req.body;
    
    // Check if company exists
    const isExist = await Company.findOne({ companyName });
    if (!isExist) {
      return next(new AppError(messages.company.wrongName, 400));
    }
    
    // Check if current user is the owner of the company
    if (String(isExist.companyHR) !== String(req.user.id)) {
      return next(new AppError(messages.company.NotAuthorized, 401));
    }
    
    // Update company
    const deleteCompany = await Company.findOneAndDelete({ companyName });
    // Send response
    return res.status(200).json({
      message: messages.company.companyDeleted,
      success: true,
      deleteCompany
    });
}

// Get company data
const getCompanyData = async (req, res, next) => {
  const { id } = req.params;
  const company = await Company.findById(id).populate("companyHR");
  if (!company) {
    return next(new AppError({ message: messages.company.companyNotFound }, 404));
  }
  return res.status(200).json({
    message: "Company fetched successfully",
    success: true,
    data: company,
  });
}

export {
    addCompany,
    updateCompany,
    deleteCompany,
    getCompanyData
}