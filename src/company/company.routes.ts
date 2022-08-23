import { CompanyController  } from "./company.controller";
import { Application, Router } from "express";

class AuthRouter {
  public readonly userController: CompanyController;
  private router: Router;

  constructor() {
    this.userController = new CompanyController();
    this.router = Router({ mergeParams: true });
  }

  getRouter() {
    this.router.post("/all", [], this.userController.getCompanies);

    this.router.post("/create", [], this.userController.createNewCompany);
    
    return this.router;
  }
}

export default AuthRouter;
