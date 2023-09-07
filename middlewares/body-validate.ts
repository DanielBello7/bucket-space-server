import { _Request, _Response, _NextFunction } from "../global";
import { validationResult } from 'express-validator';
import APIError from "@/modules/api-error";
import httpStatus from "http-status";

function bodyValidate(req: _Request, res: _Response, next: _NextFunction) {
  const code = httpStatus.BAD_REQUEST;
  const errors = validationResult(req);
  if (!errors.isEmpty()) throw new APIError(code, 'incomplete request body', {
    context: { msg: errors.array().toString() }
  });
  return next();
}

export default bodyValidate;
