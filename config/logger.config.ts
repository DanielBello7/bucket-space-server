import { variables } from '@/constants';
import winston from 'winston';
import moment from 'moment';

interface LoggingInfo {
  level: string
  message: string
}

const { NODE_ENV } = variables;

const enumerateErrorFormat = winston.format((info: LoggingInfo) => {
  if (info instanceof Error) Object.assign(info, { message: info.stack });
  return info;
});

const customFormat = winston.format.printf((info: LoggingInfo) => (
  ` [${info.level}] - ${moment().format("MM/DD/YYYY, h:mm:ss A")}  ${info.message}`
));

const logger = winston.createLogger({
  level: NODE_ENV === "production" ? "info" : "debug",
  format: winston.format.combine(
    enumerateErrorFormat(),
    NODE_ENV === "production" ? winston.format.uncolorize() : winston.format.colorize(),
    winston.format.splat(),
    customFormat
  ),
  transports: [
    new winston.transports.Console({
      stderrLevels: ["error"]
    })
  ]
});

export default logger;
