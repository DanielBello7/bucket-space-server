import { _Request, _Response, _NextFunction } from "@/global";
import AdminModel from "@/models/admin.model";
import APIError from "@/modules/api-error";
import httpStatus from "http-status";

async function adminVerify(req: _Request, res: _Response, next: _NextFunction) {
  const code = httpStatus.UNAUTHORIZED;
  try {
    const user = req.user;
    const check = await AdminModel.findOne({ userId: user._id });
    if (!check) throw new APIError(code, "user not an admin");
    next()
  } catch (error) { next(error) }
}

export default adminVerify;
