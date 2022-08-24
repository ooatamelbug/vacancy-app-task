import UserRouter from "./../../users/user.routes";
import CompanyRouter from "./../../company/company.routes";
import AuthRouter from "./../../auth/auth.routes";
import { Application } from "express";
import VacancyRouter from "../../vacancy/vacancy.routes";

class AppRouter {
  public auth: AuthRouter;
  public company: CompanyRouter;
  public vacancy: VacancyRouter

  constructor() {
    this.auth = new AuthRouter();
    this.company = new CompanyRouter();
    this.vacancy = new VacancyRouter();
  }

  public routes(expressApp: Application) {
    expressApp.use("/api/user", UserRouter);

    expressApp.use("/api/auth", this.auth.getRouter());

    expressApp.use("/api/company", this.company.getRouter());

    expressApp.use("/api/vacancy", this.vacancy.getRouter());
  }
}

export default AppRouter;
