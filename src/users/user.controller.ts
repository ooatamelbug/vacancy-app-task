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
    try {
      const user = await this.userService.createUser(req.body as CreateUserDTO);
      if (!user) {
        throw new Error("cannot added this user");
      }
      res.status(201).json({
        data: user,
      });
    } catch (error) {
      throw error;
    }
  }
}
