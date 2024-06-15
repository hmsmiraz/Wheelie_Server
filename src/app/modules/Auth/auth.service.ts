import bcrypt from "bcrypt";
import jwt, { JwtPayload } from "jsonwebtoken";
import AppError from "../../errors/AppError";
import httpStatus from "http-status";
import { TLoginUser } from "./auth.interface";
import { User } from "../Users/user.model";
import { createToken } from "./auth.utils";
import config from "../../config";

const loginUser = async (payload: TLoginUser) => {
  // check if the user exists
  const isUserExists = await User.findOne({ email: payload.email });

  if (!isUserExists) {
    throw new AppError(httpStatus.NOT_FOUND, "This user is not found !");
  }

  // create access token
  const jwtPayload = {
    userId: isUserExists._id,
    role: isUserExists.role,
    email: isUserExists.email,
  };
  const accessToken = createToken(
    jwtPayload,
    config.jwt_access_secret as string,
    config.jwt_access_expires_in as string,
  );
  return {
    accessToken,
    isUserExists,
  };
};

export const AuthServices = {
  loginUser,
};
