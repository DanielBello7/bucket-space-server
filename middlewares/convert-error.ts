import { _Request, _NextFunction, _Response } from "@/global";
import APIError from "@/modules/api-error";
import ensureError from "@/modules/ensure-error";
import httpStatus from "http-status";

function convertError(error: unknown, req: _Request, res: _Response, next: _NextFunction) {
  if (error instanceof APIError) return next(error);
  const err = ensureError(error);
  const newError = new APIError(httpStatus.INTERNAL_SERVER_ERROR, err.message, {
    cause: err
  });
  return next(newError);
}

export default convertError;
