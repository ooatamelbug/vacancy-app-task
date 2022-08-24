import { CompanyController } from "./company.controller";
import { Router } from "express";
import Auth from "../middleware/auth";

class CompanyRouter {
  public readonly userController: CompanyController;
  private router: Router;

  constructor() {
    this.userController = new CompanyController();
    this.router = Router({ mergeParams: true });
  }

  getRouter() {
    this.router.get("/all", [Auth], this.userController.getCompanies);

    this.router.post("/create", [Auth], this.userController.createNewCompany);

    return this.router;
  }
}

export default CompanyRouter;
