import { UserController } from "./user.controller";
import { Application, Router } from "express";

class UserRouter {
  private userController: UserController;
  private router: Router;

  constructor() {
    this.userController = new UserController();
    this.router = Router({ mergeParams: true });
  }

  allRouter() {
    this.router.post("/create", [], this.userController.createNewUser);

    this.router.get("/", [], this.userController.getindex);
  }

  getRouter() {
    this.allRouter();
    return this.router;
  }
}

export default new UserRouter().getRouter();
