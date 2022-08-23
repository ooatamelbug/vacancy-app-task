import UserRouter from "./../../users/user.routes";
import AuthRouter from "./../../auth/auth.routes";
import { Application } from "express";

class AppRouter {
  private app: Application;
  public auth: AuthRouter;

  constructor() {
    this.auth = new AuthRouter();
  }

  public routes(expressApp: Application) {
    expressApp.use("/api/user", UserRouter);

    expressApp.use("/api/auth", this.auth.getRouter());
  }
}

export default AppRouter;
