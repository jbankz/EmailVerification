import nodemailer from "nodemailer";
import config from "config";
import { logger } from "./logger";
import { generateOtp } from "./helpers";
import express from "express";

// async function createTestCreds() {
//   const creds = await nodemailer.createTestAccount();
//   console.log({ creds });
// }

// createTestCreds();

var hbs = require("nodemailer-express-handlebars");
const path = require("path");

const smtp = config.get<{
  user: string;
  pass: string;
  host: string;
  port: number;
  secure: boolean;
  secureConnection: boolean;
}>("smtp");

const transporter = nodemailer.createTransport({
  ...smtp,
  auth: { user: smtp.user, pass: smtp.pass }
});

const handlebarOptions = {
  viewEngine: {
    extName: ".hbs",
    partialsDir: path.resolve("/views"),
    defaultLayout: false
  },
  viewPath: path.resolve("/views"),
  extName: ".hbs"
};

transporter.use("compile", hbs(handlebarOptions));

async function emailOTP(req: express.Request, res: express.Response) {
  const _otp = generateOtp();

  const { email } = req.body;

  let payload = {
    from: smtp.user,
    to: email,
    subject: "Email Verification OTP",
    text: `${_otp}`,
    template: "index",
    html: `<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <meta http-equiv="X-UA-Compatible" content="ie=edge" />
    <title>Document</title>
    <style>
     text-align: center
     h1 { color: black; }
    </style>
  </head>
  <body>
    <h2>Welcome To Thez-Finance</h2>
    <h2>Your OTP verification code is</h2>
    <h1>${_otp}</h1>
  </body>
</html>`
  };

  transporter.sendMail(payload, (err, info): void => {
    if (err) {
      logger.error(err, "Error sending email");
      res.status(400).json({
        message: "OTP Requesting Failed",
        error: err
      });
      return;
    }

    logger.debug(`Preview URL: ${nodemailer.getTestMessageUrl(info)}`);
    res.status(200).json({
      message: "OTP Requested Successful",
      otp: _otp
    });
    return;
  });
}

export default emailOTP;
