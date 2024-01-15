import userModel from "../../../../DB/model/User.model.js";
import { asyncHandler } from "../../../utils/errorHandling.js";



export const getuser = asyncHandler(async (req, res, next) => {
  const user = await userModel.findById(req.params.userId);
  if (!user) {
    return next(new Error(`!in-valid user Id`, { cause: 400 }));
  }

  res.status(200).json({ Status: true, cause: 200, message: "Success", user });
});
