import { LoginUserDTO } from "./dto/auth.dto";
import { AuthService } from "./auth.service";
import { Request, Response } from "express";
import { Error } from "mongoose";
import { CreateUserDTO } from "./../users/dto/user.dto";
import ErrorValidateUserDTO from "./auth.validate";
import { ResponseData } from "./../shared/interface/response";

class AuthController {
  async login(req: Request, res: Response) {
    let response: ResponseData;
    try {
      const errors = await new ErrorValidateUserDTO().validateLoginUser(
        req.body as LoginUserDTO
      );

      if (errors.length) {
        res.status(400).json({ errors });
        return;
      }

      const authUser = await new AuthService().login(req.body as LoginUserDTO);

      if (!authUser.token) {
        res.status(401).json({ errors: ["error in auth"] });
        return;
      }

      req.headers.user = authUser.userId;
      res.status(200).json({
        "api-Key": authUser.token,
      });
    } catch (error) {
      response = { errors: [error.message] };
      return res.status(500).json(response);
    }
  }

  async register(req: Request, res: Response) {
    let response: ResponseData;
    try {
      const errors = await new ErrorValidateUserDTO().validateCreateUser(
        req.body as CreateUserDTO
      );
      if (errors !== undefined) {
        res.status(400).json({ errors });
        return;
      }

      const authUser = await new AuthService().register(
        req.body as CreateUserDTO
      );

      if (!authUser.token) {
        res.status(401).json({ errors: ["error in auth"] });
        return;
      }

      req.headers.user = authUser.userId;
      res.status(200).json({
        "api-Key": authUser.token,
      });
    } catch (error) {
      response = { errors: [error.message] };
      return res.status(500).json(response);
    }
  }
}

export default AuthController;
