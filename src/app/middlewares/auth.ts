import { NextFunction, Request, Response } from "express";
import jwt, { JwtPayload } from "jsonwebtoken";
import catchAsync from "../utils/catchAsync";
import AppError from "../errors/AppError";
import httpStatus from "http-status";
import { TUserRole } from "../modules/Users/user.interface";
import config from "../config";
import { User } from "../modules/Users/user.model";
import sendResponse from "../utils/sendResponse";

const auth = (...requiredRoles: TUserRole[]) => {
  return catchAsync(async (req: Request, res: Response, next: NextFunction) => {
    let token: string;
    const getToken = req.headers.authorization;
    // split the token
    if (getToken?.split(" ")[0] === "Bearer") {
      token = getToken?.split(" ")[1] as string;
    } else {
      token = getToken as string;
    }
    if (!token) {
      sendResponse(res, {
        success: false,
        statusCode: 401,
        message: "You have no access to this route",
      });
      return;
    }

    const decoded = jwt.verify(
      token,
      config.jwt_access_secret as string
    ) as JwtPayload;

    const user = await User.isUserExistsByEmail(decoded.email);

    if (!user) {
      throw new AppError(httpStatus.NOT_FOUND, "This user is not found !");
    }
    if (requiredRoles && !requiredRoles.includes(decoded.role)) {
      sendResponse(res, {
        success: false,
        statusCode: 401,
        message: "You have no access to this route",
      });
      return;
    }

    req.user = decoded as JwtPayload;
    next();
  });
};

export default auth;
