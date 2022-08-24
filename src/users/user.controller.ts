import { ResponseData } from "./../shared/interface/response";
import { CreateUserDTO } from "./dto/user.dto";
import { UserService } from "./user.service";
import { Request, Response } from "express";

export class UserController {
  private userService: UserService;

  constructor() {
    this.userService = new UserService();
  }

  getindex(req: Request, res: Response) {
    console.log("run.....");

    res.status(200).json({
      message: "here is test",
    });
  }

  async createNewUser(req: Request, res: Response) {
    let response: ResponseData;
    try {
      const user = await this.userService.createUser(req.body as CreateUserDTO);

      if (!user) {
        response = {
          success: false,
          errors: ["cannot added this user"],
        };
        return res.status(404).json(response);
      }

      response = {
        data: user,
      };
      res.status(201).json(response);
    } catch (error) {
      response = { errors: [error.message] };
      return res.status(500).json(response);
    }
  }
}
