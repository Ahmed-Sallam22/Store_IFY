import { asyncHandler } from "../../../utils/errorHandling.js";
import CouponModel from "../../../../DB/model/Coupon.model.js";

export const createCoupon = asyncHandler(async (req, res, next) => {
  const { name } = req.body;
  if (await CouponModel.findOne({ name })) {
    return next(new Error(`!Dublicate Coupon ${name}`, { cause: 409 }));
  }
  const coupon = await CouponModel.create(req.body);
  res.status(201).json({Status:true ,cause:201, message: "Success", coupon });
});






export const updateCoupon = asyncHandler(async (req, res, next) => {
  const coupon = await CouponModel.findById(req.params.couponId);
  if (!coupon) {
    return next(new Error(`!in-valid coupon Id`, { cause: 400 }));
  }
  if (req.body.name) {
    if (coupon.name == req.body.name) {
      return next(
        new Error(`!Sorry Can’t update with same Name`, { cause: 409 })
      );
    }
    if (await CouponModel.findOne({ name: req.body.name })) {
      return next(
        new Error(`!Dublicate Coupon ${req.body.name}`, { cause: 400 })
      );
    }
    coupon.name = req.body.name;
  }
  if (req.body.amount) {
    if (coupon.amount == req.body.amount) {
      return next(
        new Error(`!Sorry Can’t update with same Amount`, { cause: 409 })
      );
    }
    coupon.amount = req.body.amount;
  }
 

  await coupon.save();
  res.status(201).json({Status:true ,cause:201, message: "Success", coupon });
});

export const getCoupon = asyncHandler(async (req, res, next) => {
  const coupon = await CouponModel.find()
  res.status(200).json({Status:true ,cause:200, message: "Success", coupon });
});
