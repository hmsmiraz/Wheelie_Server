import httpStatus from "http-status";
import catchAsync from "../../utils/catchAsync";
import sendResponse from "../../utils/sendResponse";
import { BikeServices } from "./bike.service";

const createBike = catchAsync(async (req, res) => {
  const result = await BikeServices.createBikeIntoDB(req.body);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Bike added successfully",
    data: result,
  });
});
const getAllBikes = catchAsync(async (req, res) => {
  const result = await BikeServices.getAllBikeFromDB();

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Bikes retrieved successfully",
    data: result,
  });
});

const getSingleBike = catchAsync(async (req, res) => {
  const { bikeId } = req.params;
  const result = await BikeServices.getSingleBikeFromDB(bikeId);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Bike is retrieved successfully",
    data: result,
  });
});
const updateBike = catchAsync(async (req, res) => {
  const { bikeId } = req.params;
  const result = await BikeServices.updateBikeIntoDB(bikeId, req.body);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Bike updated successfully",
    data: result,
  });
});

export const BikeControllers = {
  createBike,
  getAllBikes,
  getSingleBike,
  updateBike,
};
