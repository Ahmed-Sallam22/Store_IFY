import { Router } from "express";
import * as validators from './Subcategory.validation.js'
import {fileUpload,fileValidation} from '../../utils/multer.js'
import * as subcategoryController from './controller/Subcategory.js'
import { validation } from "../../middleware/validation.js";

const router = Router({mergeParams:true})

router.post('/',
validation(validators.creatSubCategory),
subcategoryController.createSubCategory)

router.put('/:SubcategoryId',
validation(validators.creatSubCategory),
subcategoryController.updateSubCategory)

router.get('',
subcategoryController.getSubCategory)



export default router