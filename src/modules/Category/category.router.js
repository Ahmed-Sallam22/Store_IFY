import { Router } from "express";
import * as validators from './category.validation.js'
import {fileUpload,fileValidation} from '../../utils/multer.js'
import * as categoryController from './controller/category.js'
import { validation } from "../../middleware/validation.js";
import SubcategoryRouter from '../../modules/SubCategory/Subcategory.router.js'


const router = Router()

router.use('/:categoryId/subcategory',SubcategoryRouter)


router.post('/',
fileUpload(fileValidation.image).single("image"),
validation(validators.creatCategory),
categoryController.createCategory)

router.put('/:categoryId',
fileUpload(fileValidation.image).single("image"),
validation(validators.updateCategory),
categoryController.updateCategory)

router.get('',
categoryController.getCategory)
router.get('/:categoryId',
categoryController.getCategorybyId)


export default router