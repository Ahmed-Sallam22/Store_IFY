import { Router } from "express";
import * as validators from './Branch.validation.js'
import * as branchController from './controller/branch.js'
import { validation } from "../../middleware/validation.js";

const router = Router({mergeParams:true})


router.post('/',
validation(validators.creatbranch),
branchController.createbranch)

router.put('/:branchId',
validation(validators.creatbranch),
branchController.updatebranch)

router.get('/',
branchController.getbranch)


export default router