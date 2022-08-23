import UserRouter from "./../../users/user.routes";
import CompanyRouter from "./../../company/company.routes";
import AuthRouter from "./../../auth/auth.routes";
import { Application } from "express";

class AppRouter {
  public auth: AuthRouter;
  public company: CompanyRouter;

  constructor() {
    this.auth = new AuthRouter();
    this.company = new CompanyRouter();
  }

  public routes(expressApp: Application) {
    expressApp.use("/api/user", UserRouter);

    expressApp.use("/api/auth", this.auth.getRouter());

    expressApp.use("/api/company", this.company.getRouter());
  }
}

export default AppRouter;
