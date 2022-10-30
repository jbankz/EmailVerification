import express from "express";
import { body } from "express-validator";
import { CommonRoutesConfig } from "../../config/CommonRoutesConfig";
import EmailController from "../controller/EmailController";

export class EmailRoutes extends CommonRoutesConfig {
  constructor(app: express.Application) {
    super(app, "EmailRoutes");
  }

  configureRoutes(): express.Application {
    this.app
      .route("/api/otp/request-otp")
      .post(body("email").isEmail(), EmailController.requestOtp);
    return this.app;
  }
}
