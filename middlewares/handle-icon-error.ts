import { _Request, _NextFunction, _Response } from "@/global";

export default function handleIconError(req: _Request, res: _Response, next: _NextFunction) {
  if (req.url === "/favicon.ico") return res.end();
  return next();
}
