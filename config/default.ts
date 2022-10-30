export default {
  port: process.env.PORT || 8080,
  dbUri: process.env.MONGO_URI || "",
  logLevel: "info",
  accessTokenPrivateKey: "",
  refreshTokenPrivateKey: "",
  smtp: {
    user: process.env.EMAIL_USER || "",
    pass: process.env.EMAIL_USER_PASSWORD || "",
    host: process.env.EMAIL_USER_HOST || "",
    port: process.env.EMAIL_USER_PORT || 908,
    secure: process.env.EMAIL_USER_SECURE || false,
    secureConnection: process.env.EMAIL_USER_SECURE_CONNECTION || false
  }
};
