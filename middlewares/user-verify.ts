import { _Request, _Response, _NextFunction } from "@/global";
import APIError from "@/modules/api-error";
import httpStatus from "http-status";

async function userVerify(req: _Request, res: _Response, next: _NextFunction) {
  const code = httpStatus.UNAUTHORIZED;
  try {
    const user = req.user;
    const check = false
    if (!check) throw new APIError(code, "user not authorized");
    next()
  } catch (error) { next(error) }
}

export default userVerify;
