import userModel from "../../DB/model/User.model.js";
import { verifyToken } from "../utils/GenerateAndVerifyToken.js";
import { asyncHandler } from "../utils/errorHandling.js";
export const auth = () => {
  return asyncHandler(async (req, res, next) => {
    const { authorization } = req.headers;
    if (!authorization?.startsWith(process.env.BEARER_KEY)) {
      return next(new Error("In-valid bearer key", { cause: 400 }));
    }
    const token = authorization.split(process.env.BEARER_KEY)[1];
    if (!token) {
      return next(new Error("In-valid token", { cause: 400 }));
    }
    const decoded = verifyToken(token);
    if (!decoded?.id) {
      return next(new Error("In-valid Token Pauyload", { cause: 400 }));
    }
    const user = await userModel
      .findById(decoded.id)
      .select("userName email role ChangepasswordTime");

      if (parseInt(user.ChangepasswordTime?.getTime()/1000)>decoded.iat) {
        return next(new Error("Expire Token", { cause: 400 }));
      }
    if (user) {
      return next(new Error("Not register account", { cause: 40 }));
    }
    req.user = authUser;
    return next();
  })
};
