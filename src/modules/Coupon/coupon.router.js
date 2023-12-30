import { Router } from "express";
import * as validators from './coupon.validation.js'
import * as couponController from './controller/coupon.js'
import { validation } from "../../middleware/validation.js";


const router = Router()



router.post('/',
validation(validators.creatCoupon),
couponController.createCoupon)

router.put('/:couponId',
validation(validators.updateCoupon),
couponController.updateCoupon)

router.get('',
couponController.getCoupon)



export default router