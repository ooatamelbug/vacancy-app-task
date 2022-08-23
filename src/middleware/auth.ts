import { ResponseData } from "./../shared/interface/response";
import { CustomRequest } from "./../shared/interface/request";
import { Response, NextFunction } from "express";
import JwtService from "../shared/service/jwt.service";

const Auth = async (req: CustomRequest, res: Response, next: NextFunction) => {
  try {
    let response: ResponseData;
    const apiKey = req.headers["authorization"];
    if (!apiKey) {
      response = {
        success: false,
        errors: ["unauthorization"],
      };
      return res.status(401).json(response);
    } else {
      const isValideToken = await new JwtService().verifyToken(apiKey);
      console.log(isValideToken);

      if (!isValideToken) {
        response = {
          success: false,
          errors: ["inValid authorization"],
        };
        return res.status(401).json(response);
      }

      const { sub } = isValideToken;
      req.user = sub as string;
      next();
    }
  } catch (error) {
    throw error;
  }
};

export default Auth;
