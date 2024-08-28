import { createLogger, transports, format } from "winston";
import { getConfig } from "../config/config";

const config = getConfig();

export const logger = createLogger({
  level: config.loggerLevel,
  format: format.combine(
    format.timestamp(),
    format.printf(
      ({ timestamp, level, message }) =>
        `${timestamp} [${level.toUpperCase()}]: ${message}`
    )
  ),
  transports: [
    new transports.Console(),
    new transports.File({ filename: "combined.log" }),
  ],
});
