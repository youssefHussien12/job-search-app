import jwt from 'jsonwebtoken'
import { AppError } from '../utils/appError.js'
import { messages } from '../utils/common/messages.js'


export const verfiyToken = (role) => {
return async (req,res,next)=>{
  let { token } = req.headers
  jwt.verify(token , "my-Secret-Key", (err, decoded) => {
      if (err) next(new AppError({message:messages.token.invaliedToken, err},401))
        
        if(!role.includes(decoded?.role)){
          return next(new AppError({message:messages.user.userNotAuthorized},401))
        }
   
        req.user = decoded

      next()
  })
}
}

