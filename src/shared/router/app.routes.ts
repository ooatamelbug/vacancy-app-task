import UserRouter from "./../../users/user.routes";
import AuthRouter from "./../../auth/auth.routes";
import { Application } from "express";

class AppRouter {
  private app: Application;

  public routes(expressApp: Application) {
    expressApp.use("/api/user", UserRouter);
    expressApp.use("/api/auth", AuthRouter);
  }
}

export default AppRouter;
