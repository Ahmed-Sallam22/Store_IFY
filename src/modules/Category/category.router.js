import { Router } from "express";
import * as validators from './category.validation.js'
import {fileUpload,fileValidation} from '../../utils/multer.js'
import * as categoryController from './controller/category.js'
import { validation } from "../../middleware/validation.js";

const router = Router()

router.post('/addCategory',
fileUpload(fileValidation.image).single("image"),
validation(validators.creatCategory),
categoryController.createCategory)

router.put('/:categoryId',
fileUpload(fileValidation.image).single("image"),
validation(validators.updateCategory),
categoryController.updateCategory)

router.get('',
categoryController.getCategory)


export default router