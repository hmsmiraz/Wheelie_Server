import { Response } from "express";

type TResponse<T> = {
  statusCode: number;
  success: boolean;
  message?: string;
  data?: any;
};

const sendResponse = <T>(res: Response, data: TResponse<T>) => {
  res.json({
    success: data.success,
    statusCode: data.statusCode,
    message: data.message,
    data: data.data,
  });
};

export default sendResponse;
