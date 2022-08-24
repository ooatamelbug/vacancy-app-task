import { CustomRequest } from "./../shared/interface/request";
import { LoginUserDTO } from "./dto/auth.dto";
import { AuthService } from "./auth.service";
import { Response } from "express";
import { CreateUserDTO } from "./../users/dto/user.dto";
import ErrorValidateUserDTO from "./auth.validate";
import { ResponseData } from "./../shared/interface/response";

class AuthController {
  async signin(req: CustomRequest, res: Response) {
    let response: ResponseData;
    try {
      const errors = await new ErrorValidateUserDTO().validateLoginUser(
        req.body as LoginUserDTO
      );

      if (errors !== undefined) {
        res.status(400).json({ errors });
        return;
      }

      const authUser = await new AuthService().signin(req.body as LoginUserDTO);

      if (!authUser.token) {
        res.status(401).json({ errors: ["error in auth"] });
        return;
      }

      req.user = authUser.userId;
      res.status(200).json({
        "api-Key": authUser.token,
      });
    } catch (error) {
      response = { success: false, errors: [error.message] };
      return res.status(500).json(response);
    }
  }

  async signup(req: CustomRequest, res: Response) {
    let response: ResponseData;
    try {
      const errors = await new ErrorValidateUserDTO().validateCreateUser(
        req.body as CreateUserDTO
      );
      if (errors !== undefined) {
        res.status(400).json({ errors });
        return;
      }

      const authUser = await new AuthService().signup(
        req.body as CreateUserDTO
      );

      if (!authUser.token) {
        res.status(401).json({ errors: ["error in auth"] });
        return;
      }

      req.user = authUser.userId;
      res.status(200).json({
        "api-Key": authUser.token,
      });
    } catch (error) {
      response = { success: false, errors: [error.message] };
      return res.status(500).json(response);
    }
  }
}

export default AuthController;
