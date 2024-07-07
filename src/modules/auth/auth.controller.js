import  jwt from "jsonwebtoken";
import bcrypt from 'bcrypt'
import { User } from "../../../database/models/user.model.js"
import { AppError } from "../../utils/appError.js";
import { userStatus } from "../../utils/common/enum.js";
import { messages } from "../../utils/common/messages.js";
import { sendEmails } from "../../utils/email.js";

const signUp = async (req, res, next) => {
    // get data from req
    let { firstName, lastName, userName, email, password, recoveryEmail, DOB, mobileNumber,role } = req.body;

    // check if user exist
    let userExist = await User.findOne({ email })

    if (userExist && userExist.comfirmedEmail == true) {
        return next(new AppError(messages.user.userAlreadyExist, 409))
    }
    if (userExist && userExist.comfirmedEmail == false) {
        sendEmails(email)
        return res.status(200).json({ message: messages.user.verfifYourAccount })
    }
    // hash password
    const hashPassword = bcrypt.hashSync(password, 10)

    //prepare user
    let user = new User({
        firstName,
        lastName,
        userName :`${firstName} ${lastName}`,
        email,
        password :hashPassword,
        recoveryEmail,
        DOB,
        mobileNumber,
        role
    })
    //save user 
    let ceratedUser = await user.save()
    //send email 
    sendEmails(email)
    //send response
    res.status(201).json({ message: messages.user.cerateUser, success: true, data: ceratedUser })

}
const verifyAccount = async (req, res, next) => {
    jwt.verify(req.params.token, "my-Secret-Key", async (err, payloed) => {
        if (err) return next(new AppError(messages.token.invaliedToken, 401))
        let user = await User.findOneAndUpdate({ email: payloed.email, comfirmedEmail: false }, { comfirmedEmail: true })
        if (!user) {
            next(new AppError(messages.user.userNotFound, 404))
        }
        res.json({ message: messages.user.verifyAccount, success: true, email: payloed.email })
    })
}
const signIn = async (req,res,next)=>{
     //get data from req.body
  const { email,mobileNumber, password } = req.body;
  // check if user exist
  const user = await User.findOne({
    $or: [{ email: email }, { mobileNumber: mobileNumber }],
  });

  if (!user) {
    return next(new AppError(messages.user.userNotFound, 401));
  }
  // check if password is correct
  const isMatch = bcrypt.compareSync(password, user.password);
  if (!isMatch) {
    return next(new AppError(messages.user.incorrectPassword, 401));
  }
  // update user status
  user.status = userStatus.ONLINE;
  await user.save();
  // create token
  const token = jwt.sign(
    { email: user.email, id: user._id, role: user.role,recoveryEmail:user.recoveryEmail},
    "my-Secret-Key"
  );
  // send response
  user.password = undefined;
  return res.status(200).json({
    message: messages.user.signedInSuccessfully,
    success: true,
    token,
    data: user,
  });
}





export { signUp , signIn ,verifyAccount }