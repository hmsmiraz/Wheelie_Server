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
    message: "Bikes retrieved successfully",
    data: result,
  });
});

const updateBike = catchAsync(async (req, res) => {
  const { bikeId } = req.params;
  const result = await BikeServices.updateBikeIntoDB(bikeId, req.body);

  if (!result) {
    res.json({
      success: false,
      message: "No Data Found",
      data: result,
    });
  }
  res.json({
    success: true,
    statusCode: 200,
    message: "Bike updated successfully",
    data: result,
  });
});

const deleteBike = catchAsync(async (req, res) => {
  const { bikeId } = req.params;
  const result = await BikeServices.deleteBikeFromDB(bikeId);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Bike deleted successfully",
    data: result,
  });
});

export const BikeControllers = {
  createBike,
  getAllBikes,
  updateBike,
  deleteBike,
};
