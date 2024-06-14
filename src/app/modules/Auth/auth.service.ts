import bcrypt from "bcrypt";
import jwt, { JwtPayload } from "jsonwebtoken";
import AppError from "../../errors/AppError";
import httpStatus from "http-status";
import { TLoginUser } from "./auth.interface";
import { User } from "../Users/user.model";
import { createToken } from "./auth.utils";
import config from "../../config";

const loginUser = async (payload: TLoginUser) => {
  const user = await User.isUserExistsByEmail(payload.email);
  const { _id, name, email, phone, address, role }: any = user;

  if (!user) {
    throw new AppError(httpStatus.NOT_FOUND, "This user is not found !");
  }

  const jwtPayload = {
    userId: user._id,
    role: user.role,
    email: user.email,
  };
  const accessToken = createToken(
    jwtPayload,
    config.jwt_access_secret as string,
    config.jwt_access_expires_in as string
  );

  const refreshToken = createToken(
    jwtPayload,
    config.jwt_refresh_secret as string,
    config.jwt_refresh_expires_in as string
  );

  return {
    user: {
      _id: user._id,
      name: user.name,
      email: user.email,
      phone: user.phone,
      address: user.address,
      role: user.role,
    },
    accessToken,
    refreshToken,
  };
};


export const AuthServices = {
  loginUser,
  changePassword,
  refreshToken,
};
