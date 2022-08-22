import { AuthController } from "./auth.controller";
import { Application, Router } from "express";

class AuthRouter {
  private userController: AuthController;
  private router: Router;

  constructor() {
    this.userController = new AuthController();
    this.router = Router({ mergeParams: true });
  }

  allRouter() {
    this.router.post("/login", [], this.userController.login);

    this.router.get("/register", [], this.userController.register);
  }

  getRouter() {
    this.allRouter();
    return this.router;
  }
}

export default new AuthRouter().getRouter();
