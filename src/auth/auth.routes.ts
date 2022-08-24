import AuthController from "./auth.controller";
import { Router } from "express";

class CompanyRouter {
  public readonly userController: AuthController;
  private router: Router;

  constructor() {
    this.userController = new AuthController();
    this.router = Router({ mergeParams: true });
  }

  getRouter() {
    this.router.post("/signin", [], this.userController.signin);

    this.router.post("/signup", [], this.userController.signup);

    return this.router;
  }
}

export default CompanyRouter;
