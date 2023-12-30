import { asyncHandler } from "../../../utils/errorHandling.js";
import categoryModel from "../../../../DB/model/Category.model.js";
import slugify from "slugify";
import SubcategoryModel from "../../../../DB/model/Subcategory.model.js";

export const createSubCategory = asyncHandler(async (req, res, next) => {
  const {categoryId}=req.params
  if (!await categoryModel.findById(categoryId)) {
        return next(new Error(`!in-Valid CategoryId`, { cause: 400 }));
  }
  const { name } = req.body;
  if (await SubcategoryModel.findOne({ name })) {
    return next(new Error(`!Dublicate SubCategory${name}`, { cause: 409 }));
  }
  const subcategory = await SubcategoryModel.create({
    name,
    slug: slugify(name, "-"),
    categoryId
  });
  res.status(201).json({Status:true ,cause:201 , message: "Success",subcategory});
});


export const updateSubCategory = asyncHandler(async (req, res, next) => {
  const {categoryId,SubcategoryId}=req.params

  const subcategory = await SubcategoryModel.findOne({_id:SubcategoryId,categoryId});
  if (!subcategory) {
    return next(new Error(`!in-valid SubCategory`,{ cause: 400 }));
  }

  
  if (req.body.name) {
    if (subcategory.name == req.body.name) {
      return next(
        new Error(`!Sorry Can’t update with same Name`, { cause: 409 })
      );
    }
    if (await SubcategoryModel.findOne({ name: req.body.name })) {
      return next(
        new Error(`!Dublicate SubCategory${req.body.name}`, { cause: 400 })
      );
    }
    subcategory.name = req.body.name;
    req.body.slug = slugify(req.body.name, "-");
  }

  await subcategory.save();
  res.status(201).json({ Status:true ,cause:201, message: "Success", subcategory });
});


export const getSubCategory = asyncHandler(async (req, res, next) => {
  const Subcategory = await SubcategoryModel.find().populate([
    {
      path:'categoryId'
    }
  ]);
  res.status(200).json({Status:true ,cause:200, message: "Success", Subcategory });
});
