import { User } from "../../../database/models/user.model.js"
import { AppError } from "../../utils/appError.js"
import bcrypt from 'bcrypt'
import { messages } from "../../utils/common/messages.js"

//get profile
const getMyProfile = async (req, res) => {
    let user = await User.find({ _id: req.user.id })
    res.status(200).json({ data: req.user, success: true, user })
}

// delete profile
const deleteProfile = async (req, res) => {
    await User.findByIdAndDelete({ _id: req.user.id })
    return res.status(200).json({ message: messages.user.deleteProfile, success: true })

}


//update profile 
const updataProfile = async (req, res, next) => {
    let user = await User.updateOne({ _id: req.user.id }, req.body, { new: true })
    if (user.email && user.mobileNumber) {
        next(new AppError({ message: messages.user.userAlreadyExist }, 409))
    }
    return res.status(200).json({ message: messages.user.updateProfile, success: true })
}


//update password
const updatePassword = async (req, res, next) => {
    const { oldPassword, newPassword } = req.body;
    const user = await User.findById(req.user.id);
    const isMatch = bcrypt.compareSync(oldPassword, user.password);
    if (!isMatch) {
        return next(
            new AppError({ message: messages.user.incorrectPassword }, 401)
        );
    }
    user.password = bcrypt.hashSync(newPassword, 10);
    await user.save();
    return res.status(200).json({
        message: messages.user.updatedPassword,
        success: true,
    });
};


// accounts-by-recovery-email
const getAccountsByRecoveryEmail = async (req, res) => {
    const { recoveryEmail } = req.user;
    const users = await User.find({ recoveryEmail });
    return res.status(200).json({
        message: messages.user.getUsers,
        success: true,
        data: users,
    });
};




export {
    getMyProfile,
    deleteProfile,
    updataProfile,
    updatePassword,
    getAccountsByRecoveryEmail
}