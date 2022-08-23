import AuthController from "./auth.controller";
import { Application, Router } from "express";

class AuthRouter {
  public readonly userController: AuthController;
  private router: Router;

  constructor() {
    this.userController = new AuthController();
    this.router = Router({ mergeParams: true });
  }

  getRouter() {
    this.router.post("/login", [], this.userController.login);

    this.router.post("/register", [], this.userController.register);
    
    return this.router;
  }
}

export default AuthRouter;
