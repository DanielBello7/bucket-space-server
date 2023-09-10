import { _Request, _NextFunction, _Response } from "@/global";
import { variables } from "@/constants";

export default function secret(req: _Request, res: _Response, next: _NextFunction) {
  req.secret = variables.EXPRESS_SECRET;
  return next();
}
