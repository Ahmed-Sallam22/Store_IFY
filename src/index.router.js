import connectDB from '../DB/connection.js'
import authRouter from './modules/auth/auth.router.js'
import categoryRouter from './modules/Category/category.router.js'
import SubcategoryRouter from './modules/SubCategory/Subcategory.router.js'
import couponRouter from './modules/Coupon/coupon.router.js'
import { globalErrorHandling } from './utils/errorHandling.js'
import cors from 'cors' 

const initApp = (app, express) => {
    app.use(express.json({}))
    app.use(`/auth`, authRouter)
    app.use(`/category`, categoryRouter)
    app.use(`/subcategory`, SubcategoryRouter)
    app.use(`/coupon`, couponRouter)
    app.use(cors({}))
    app.all('*', (req, res, next) => {
         res.send("In-valid Routing Plz check url  or  method")
    })
    app.use(globalErrorHandling)
    connectDB()

}



export default initApp