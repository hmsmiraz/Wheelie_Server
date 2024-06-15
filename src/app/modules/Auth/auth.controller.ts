import httpStatus from "http-status";
import catchAsync from "../../utils/catchAsync";
import { AuthServices } from "./auth.service";
import { Request, Response } from "express";

const loginUser = catchAsync(async (req: Request, res: Response) => {
  const result = await AuthServices.loginUser(req.body);
  const { accessToken, isUserExists } = result;

  res.status(httpStatus.OK).json({
    success: true,
    statusCode: httpStatus.OK,
    message: "User is logged in successfully!",
    token: accessToken,
    data: isUserExists,
  });
});

export const AuthControllers = {
  loginUser,
};
