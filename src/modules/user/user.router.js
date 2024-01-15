import { Router } from "express";
import * as userControler from './controller/user.router.js'
const router = Router()

router.get('/:userId',userControler.getuser)



export default router