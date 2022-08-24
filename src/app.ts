import express, { Application } from "express";

import connectDB from "./database/db.config";

import cors from "cors";

import AppRouter from "./shared/router/app.routes";

class App {
  public app: Application;
  public routerApp: AppRouter;

  constructor() {
    this.app = express();

    this.app.use(express.json());

    this.app.use(
      cors({
        origin: "*",
      })
    );

    connectDB;

    this.routerApp = new AppRouter();
    this.routerApp.routes(this.app);

    // new AppRouter(this.app);
  }
}

export default new App().app;
