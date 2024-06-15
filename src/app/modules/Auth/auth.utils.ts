import jwt from "jsonwebtoken";

export const createToken = (
  jwtPayload: { role: string; email: string },
  secret: string,
  expiresIn: string,
) => {
  return jwt.sign(jwtPayload, secret, {
    expiresIn,
  });
};
