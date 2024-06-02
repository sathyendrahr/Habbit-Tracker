import logger from "./logger.js";

export default class ApplicationError extends Error {
  constructor(statusCode, message) {
    super(message);
    this.statusCode = statusCode;
  }
}

export const errorHandler = (err, req, res, next) => {
  logger.error(err.stack);
  if (!err instanceof ApplicationError) {
    err.statusCode = 500;
    err.message = "Something went wrong";
  }
  res.render("error", { err });
};
