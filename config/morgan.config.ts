import { Request, Response } from "express";
import { variables } from "@/constants";
import morgan from "morgan";
import logger from "./logger.config";

morgan.token(
  "message",
  (_req: Request, res: Response) => res.locals["errorMessage" || ""]
);

const getIpFormat = () =>
  variables.NODE_ENV === "production" ? ":remote-addr - " : "";

const successResponseFormat = `${getIpFormat()}:method :url :status - :response-time ms`;
const errorResponseFormat = `${getIpFormat()}:method :url :status - :response-time ms - message: :message`;

const morganSuccessHandler = morgan(successResponseFormat, {
  skip: (_req: Request, res: Response) => res.statusCode >= 400,
  stream: { write: (message: string) => logger.info(message.trim()) },
});

const morganErrorHandler = morgan(errorResponseFormat, {
  skip: (_req: Request, res: Response) => res.statusCode < 400,
  stream: { write: (message: string) => logger.error(message.trim()) },
});

export {
  morganSuccessHandler,
  morganErrorHandler
}
