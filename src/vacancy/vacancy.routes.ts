import { VacancyController } from "./vacancy.controller";
import { Router } from "express";
import Auth from "../middleware/auth";

class VacancyRouter {
  public readonly vacancyController: VacancyController;
  private router: Router;

  constructor() {
    this.vacancyController = new VacancyController();
    this.router = Router({ mergeParams: true });
  }

  getRouter() {
    this.router.get("/search", [Auth], this.vacancyController.searchVacancies);
    
    this.router.get("/list", [Auth], this.vacancyController.listAllVacancy);

    this.router.post(
      "/create",
      [Auth],
      this.vacancyController.createNewVacancy
    );

    this.router.post("/apply", [Auth], this.vacancyController.applyVacancy);

    return this.router;
  }
}

export default VacancyRouter;
