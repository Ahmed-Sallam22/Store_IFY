import { asyncHandler } from "../../../utils/errorHandling.js";
import cloudinary from "../../../utils/cloudinary.js";
import categoryModel from "../../../../DB/model/Category.model.js";
import slugify from "slugify";

export const createCategory = asyncHandler(async (req, res, next) => {
  const { name, description } = req.body;
  const { secure_url, public_id } = await cloudinary.uploader.upload(
    req.file.path,
    { folder: `${process.env.APP_NAME}/category` }
  );
  if (await categoryModel.findOne({ name })) {
    return next(new Error(`!Dublicate Category${name}`, { cause: 409 }));
  }
  const category = await categoryModel.create({
    name,
    slug: slugify(name, "-"),
    description,
    image: { secure_url, public_id },
  });
  res.status(201).json({Status:true ,cause:201, message: "Success", category });
});
export const updateCategory = asyncHandler(async (req, res, next) => {
  const category = await categoryModel.findById(req.params.categoryId);
  if (!category) {
    return next(new Error(`!in-valid Category Id`, { cause: 400 }));
  }
  if (req.body.name) {
    if (category.name == req.body.name) {
      return next(
        new Error(`!Sorry Can’t update with same Name`, { cause: 409 })
      );
    }
    if (await categoryModel.findOne({ name: req.body.name })) {
      return next(
        new Error(`!Dublicate Category${req.body.name}`, { cause: 400 })
      );
    }
    category.name = req.body.name;
    req.body.slug = slugify(req.body.name, "-");
  }
  if (req.body.description) {
    if (category.description == req.body.description) {
      return next(
        new Error(`!Sorry Can’t update with same description`, { cause: 409 })
      );
    }
    category.description = req.body.description;
  }
  if (req.file) {
    const { secure_url, public_id } = await cloudinary.uploader.upload(
      req.file.path,
      { folder: `${process.env.APP_NAME}/category` }
    );
    await cloudinary.uploader.destroy(category.image.public_id);
    category.image = { secure_url, public_id };
  }
  await category.save();
  res.status(201).json({Status:true ,cause:201, message: "Success", category });
});

export const getCategory = asyncHandler(async (req, res, next) => {
  const category = await categoryModel.find()
  res.status(200).json({Status:true ,cause:200, message: "Success", category });
});
export const getCategorybyId = asyncHandler(async (req, res, next) => {
  const {categoryId}=req.params
  const category = await categoryModel.findById(categoryId).populate([
    {
      path:'subcategory'
    }
  ]);
  if (!category) {
    return next(new Error(`!in-valid Category Id`, { cause: 400 }));
  }
  res.status(200).json({Status:true ,cause:200, message: "Success", category });
});
