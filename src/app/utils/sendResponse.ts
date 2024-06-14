import { Response } from "express";

type TResponse<T> = {
  statusCode: number;
  success: boolean;
  message?: string;
  data: T;
};

const sendResponse = <T>(res: Response, data: TResponse<T>) => {
  if (!data.data || (Array.isArray(data.data) && data.data.length === 0)) {
    return res.status(200).json({
      success: false,
      message: "No Data Found",
      data: [],
    });
  }

  res.status(data?.statusCode).json({
    success: data.success,
    statusCode: data.statusCode,
    message: data.message,
    data: data.data,
  });
};

export default sendResponse;
