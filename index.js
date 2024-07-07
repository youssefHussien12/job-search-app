import express from 'express'
import { dbConnection } from './database/dbConnection.js'
import authRouter from './src/modules/auth/auth.routes.js'
import { globalErrorHandling } from './src/middleware/asyncHandler.js'
import userRouter from './src/modules/user/user.routes.js'
import companyRouter from './src/modules/company/company.routes.js'
import jopRouter from './src/modules/jop/jop.routes.js'
const app = express()
const port = 3000
app.use(express.json())


app.use("/auth",authRouter)
app.use("/users",userRouter)
app.use("/company",companyRouter)
app.use("/jops",jopRouter)


app.use(globalErrorHandling)

app.get('/', (req, res) => res.send('Hello World!'))
app.listen(port, () => console.log(`Example app listening on port ${port}!`))