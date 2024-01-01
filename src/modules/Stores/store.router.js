import { Router } from "express";
import * as validators from './store.validation.js'
import * as StoreController from './controller/store.js'
import { validation } from "../../middleware/validation.js";
import BranchRouter from '../Branch/Branch.router.js'
import categoryRouter from '../Category/category.router.js'

import {fileUpload,fileValidation} from '../../utils/multer.js'

const router = Router()


router.use('/:StoreId/branch',BranchRouter)
router.use('/:StoreId/category',categoryRouter)


router.post('/',
fileUpload(fileValidation.image).single("image"),
validation(validators.createStore),
StoreController.createStore)

router.put('/:StoreId',
fileUpload(fileValidation.image).single("image"),
validation(validators.updateStore),
StoreController.updateStore)

router.get('/type/:type',
StoreController.getStoreByTybe)

router.get('/',
StoreController.getStore)

router.get('/id/:StoreId',
StoreController.getStorebyId)



export default router