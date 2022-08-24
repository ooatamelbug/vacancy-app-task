import { ResponseData } from "./../shared/interface/response";
import { CustomRequest } from "./../shared/interface/request";
import { Response, NextFunction } from "express";
import JwtService from "../shared/service/jwt.service";

const Auth = async (req: CustomRequest, res: Response, next: NextFunction) => {
  let response: ResponseData;
  try {
    const apiKey = req.headers["authorization"].split(" ")[1];
    if (!apiKey) {
      response = {
        success: false,
        errors: ["unauthorization"],
      };
      return res.status(401).json(response);
    } else {
      const isValideToken = await new JwtService().verifyToken(apiKey);
      if (!isValideToken) {
        response = {
          success: false,
          errors: ["inValid authorization"],
        };
        return res.status(401).json(response);
      }

      req.user = isValideToken;
      next();
    }
  } catch (error) {
    response = { success: false, errors: [error.message] };
    return res.status(500).json(response);
  }
};

export default Auth;
