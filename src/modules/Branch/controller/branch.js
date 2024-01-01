import { asyncHandler } from "../../../utils/errorHandling.js";
import categoryModel from "../../../../DB/model/Category.model.js";
import slugify from "slugify";
import SubcategoryModel from "../../../../DB/model/Subcategory.model.js";
import brandModel from "../../../../DB/model/Stores.model.js";
import branchModel from "../../../../DB/model/Branches.model.js";

export const createbranch = asyncHandler(async (req, res, next) => {
  const {StoreId}=req.params
  if (!await brandModel.findById(StoreId)) {
        return next(new Error(`!in-Valid StoreId`, { cause: 400 }));
  }
  const { name ,city} = req.body;
  if (await branchModel.findOne({ name })) {
    return next(new Error(`!Dublicate Branch ${name}`, { cause: 409 }));
  }
  const Branch = await branchModel.create({
    name,
    city,
    StoreId
  });
  res.status(201).json({Status:true ,cause:201 , message: "Success",Branch});
});

export const updatebranch = asyncHandler(async (req, res, next) => {
  const {StoreId,branchId}=req.params
  const branch = await SubcategoryModel.findOne({_id:branchId,StoreId});
  if (!branch) {
    return next(new Error(`!in-valid branch`,{ cause: 400 }));
  }
  if (req.body.name) {
    if (branch.name == req.body.name) {
      return next(
        new Error(`!Sorry Can’t update with same Name`, { cause: 409 })
      );
    }
    if (await branchModel.findOne({ name: req.body.name })) {
      return next(
        new Error(`!Dublicate branch${req.body.name}`, { cause: 400 })
      );
    }
    branch.name = req.body.name;
  }
  if (req.body.city) {
    if (branch.city == req.body.city) {
      return next(
        new Error(`!Sorry Can’t update with same city`, { cause: 409 })
      );
    }
    branch.city = req.body.city;
  }

  await branch.save();
  res.status(201).json({ Status:true ,cause:201, message: "Success", branch });
});

export const getbranch = asyncHandler(async (req, res, next) => {
  const {id}=req.params
  const branch = await branchModel.find(req.params).populate([
    {
      path:'StoreId'
    }
  ]);
  console.log(branch);
  res.status(200).json({Status:true ,cause:200, message: "Success", branch });
});
