// we import express to add types to the request/response objects from our controller functions
// we import the argon2 library for password hashing
import express from "express";
import { generateOtp } from "../../utils/helpers";
import emailOTP from "../../utils/mailer";

class EmailController {
  /// Requests for new OTP
  async requestOtp(req: express.Request, res: express.Response) {
    await emailOTP(req, res);
  }
}

export default new EmailController();
