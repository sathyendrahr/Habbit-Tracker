import winston from "winston";
import path from "path";

const errorFile = path.join(path.resolve("logs"), "error.log");
const logFile = path.join(path.resolve("logs"), "app.log");

const logger = winston.createLogger({
  level: "info",
  format: winston.format.json(),
  defaultMeta: { service: "app-service" },
  transports: [
    new winston.transports.File({ filename: errorFile, level: "error" }),
    new winston.transports.File({ filename: logFile }),
  ],
});

export default logger;
