import { _Request, _Response } from "@/global";
import APIError from "@/modules/api-error";

function handleError(error: APIError, req: _Request, res: _Response) {
  const { statusCode, message } = error;
  res.locals["errorMessage"] = message;
  const response = {
    statusCode,
    message,
    stack: error.stack,
    context: error.context
  }
  return res.status(statusCode).json(response);
}

export default handleError;
