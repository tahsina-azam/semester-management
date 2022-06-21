const ENV = {
  SENDGRID_API_KEY: process.env.SENDGRID_API_KEY!,
  SENDER_EMAIL: process.env.SENDER_EMAIL!,
  SENDER_EMAIL_PASSWORD: process.env.SENDER_EMAIL_PASSWORD!,
  JWT_SECRET: process.env.JWT_SECRET!,
  JWT_ALGORITHM: process.env.JWT_ALGORITHM!
};
export default ENV;
