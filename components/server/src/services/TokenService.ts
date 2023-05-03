import * as jwt from "jsonwebtoken";

export default class TokenService {
  public createAccessToken = (userId: number) => {
    return jwt.sign({ userId }, process.env.JWT_SECRET as string);
    // return jwt.sign({ userId }, process.env.JWT_SECRET as string, { expiresIn: "30m" });
  };
  public createRefreshToken = (userId: number) => {
    return jwt.sign({ userId }, process.env.JWT_SECRET_REFRESH as string, { expiresIn: "14d" });
  };

  public verifyAccessToken = (token: string) => {
    return jwt.verify(token, process.env.JWT_SECRET as string) as {
      userId: number;
    };
  };
  public verifyRefreshToken = (token: string) => {
    return jwt.verify(token, process.env.JWT_SECRET_REFRESH as string) as {
      userId: number;
    };
  };
}
