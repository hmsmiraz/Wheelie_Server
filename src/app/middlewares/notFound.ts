import httpStatus from "http-status";
import { RequestHandler } from "express";

const notFound: RequestHandler = (req, res, next) => {
  return res.status(httpStatus.NOT_FOUND).json({
    success: false,
    statusCode: httpStatus.NOT_FOUND,
    message: "Not Found",
    error: "",
  });
};

export default notFound;
