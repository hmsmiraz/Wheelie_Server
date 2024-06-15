import httpStatus from "http-status";
import catchAsync from "../../utils/catchAsync";
import sendResponse from "../../utils/sendResponse";
import { UserServices } from "./user.service";

const createUser = catchAsync(async (req, res) => {
  const result = await UserServices.createUserIntoDB(req.body);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "User Registered Successfully",
    data: result,
  });
});
const getAllUsers = catchAsync(async (req, res) => {
  const result = await UserServices.getAllUsersFromDB();
  if (!result.length) {
    res.json({
      success: false,
      message: "No Data Found",
      data: result,
    });
  }
  res.json({
    success: true,
    statusCode: 200,
    message: "Users are retrieved successfully",
    data: result,
  });
});

const getUser = catchAsync(async (req, res) => {
  const userId = req?.user?.userId;
  const result = await UserServices.getUserFromDB(userId);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "User profile retrieved successfully",
    data: result,
  });
});
const updateUser = catchAsync(async (req, res) => {
  const userId = req?.user?.userId;
  const userData = req.body;
  const result = await UserServices.updateUserIntoDB(userId, userData);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Profile updated successfully",
    data: result,
  });
});

export const UserControllers = {
  createUser,
  getAllUsers,
  getUser,
  updateUser,
};
