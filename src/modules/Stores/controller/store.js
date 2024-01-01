import { asyncHandler } from "../../../utils/errorHandling.js";
import StoreModel from "../../../../DB/model/Stores.model.js";
import cloudinary from "../../../utils/cloudinary.js";

export const createStore = asyncHandler(async (req, res, next) => {
  const { name, rate,type} = req.body;
  const { secure_url, public_id } = await cloudinary.uploader.upload(
    req.file.path,
    { folder: `${process.env.APP_NAME}/Store` }
  );
  if (await StoreModel.findOne({ name })) {
    return next(new Error(`!Dublicate name ${name}`, { cause: 409 }));
  }
  const Store = await StoreModel.create({
    name,
    type,
    rate,

    image: { secure_url, public_id },
  });
  res.status(201).json({Status:true ,cause:201, message: "Success", Store });
});






export const updateStore = asyncHandler(async (req, res, next) => {
  const Store = await StoreModel.findById(req.params.StoreId);
  if (!Store) {
    return next(new Error(`!in-valid Store Id`, { cause: 400 }));
  }
  if (req.body.name) {
    if (Store.name == req.body.name) {
      return next(
        new Error(`!Sorry Can’t update with same Name`, { cause: 409 })
      );
    }
    if (await StoreModel.findOne({ name: req.body.name })) {
      return next(
        new Error(`!Dublicate Store ${req.body.name}`, { cause: 400 })
      );
    }
    Store.name = req.body.name;
  }
  if (req.body.rate) {
    if (Store.rate == req.body.rate) {
      return next(
        new Error(`!Sorry Can’t update with same rate`, { cause: 409 })
      );
    }
    Store.rate = req.body.rate;
  }
  if (req.body.type){
    if (Store.type == req.body.type) {
      return next(
        new Error(`!Sorry Can’t update with same type`, { cause: 409 })
      );
    }
    Store.type = req.body.type;
  }
  if (req.file) {
    const { secure_url, public_id } = await cloudinary.uploader.upload(
      req.file.path,
      { folder: `${process.env.APP_NAME}/Store` }
    );
    await cloudinary.uploader.destroy(Store.image.public_id);
    Store.image = { secure_url, public_id };
  }
  await Store.save();
  res.status(201).json({Status:true ,cause:201, message: "Success", Store });
});

export const getStoreByTybe = asyncHandler(async (req, res, next) => {
  const {type}=req.params
  const Store = await StoreModel.find(req.params)
  res.status(200).json({Status:true ,cause:200, message: "Success", Store });
});

export const getStore = asyncHandler(async (req, res, next) => {
  const Store = await StoreModel.find()
  res.status(200).json({Status:true ,cause:200, message: "Success", Store });
});

export const getStorebyId = asyncHandler(async (req, res, next) => {
  const {StoreId}=req.params
  const Store = await StoreModel.findById(StoreId).populate([
    {
      path:'branch'
    }
  ]);
  if (!Store) {
    return next(new Error(`!in-valid Store Id`, { cause: 400 }));
  }
  res.status(200).json({Status:true ,cause:200, message: "Success", Store });
});