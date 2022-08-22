import "reflect-metadata";

import express, { Application } from "express";

import cors from "cors";

class App {
  public app: Application;

  constructor() {
    this.app = express();

    this.app.use(express.json);

    this.app.use(
      cors({
        origin: "*",
      })
    );
  }
}

export default new App().app;
