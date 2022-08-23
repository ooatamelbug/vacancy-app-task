import { LoginUserDTO } from "./dto/auth.dto";
import { AuthService } from "./auth.service";
import { Request, Response } from "express";
import { Error } from "mongoose";
import { CreateUserDTO } from "./../users/dto/user.dto";
import ErrorValidateUserDTO from "./auth.validate";

class AuthController {
  async login(req: Request, res: Response) {
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
        throw new Error("error in auth");
      }

      req.headers.user = authUser.userId;
      res.status(200).json({
        token: authUser.token,
      });
    } catch (error) {
      throw error;
    }
  }

  async register(req: Request, res: Response) {
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
        throw new Error("error in auth");
      }

      req.headers.user = authUser.userId;
      res.status(200).json({
        token: authUser.token,
      });
    } catch (error) {
      throw error;
    }
  }
}

export default AuthController;
