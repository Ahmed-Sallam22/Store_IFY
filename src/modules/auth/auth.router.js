import { Router } from "express";
import * as authController from './controller/Registiration.js'
import { validation } from "../../middleware/validation.js";
import * as validators from './auth.validation.js'
const router = Router()


router.post('/signup',validation(validators.signup),authController.signup)
router.get('/confirmEmail/:token',validation(validators.token), authController.confirmEmail)
router.get('/RequestNewconfirmEmail/:token',validation(validators.token), authController.RequestNewconfirmEmail)
router.post('/login',validation(validators.login), authController.login)
router.patch('/sendCode',validation(validators.sendCode),authController.sendCode)
router.post('/CheckCode',validation(validators.CheckCode),authController.CheckCode)
router.patch('/RestePassword',validation(validators.RestePassword),authController.RestePassword)



export default router