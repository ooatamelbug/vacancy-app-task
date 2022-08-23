import { CompanyController  } from "./company.controller";
import { Application, Router } from "express";
import Auth from "../middleware/auth";

class AuthRouter {
  public readonly userController: CompanyController;
  private router: Router;

  constructor() {
    this.userController = new CompanyController();
    this.router = Router({ mergeParams: true });
  }

  getRouter() {
    this.router.post("/all", [Auth], this.userController.getCompanies);

    this.router.post("/create", [Auth], this.userController.createNewCompany);
    
    return this.router;
  }
}

export default AuthRouter;
