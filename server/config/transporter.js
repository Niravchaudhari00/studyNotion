import { createTransport } from "nodemailer";
import { config } from "dotenv";
config();

const transporter = createTransport({
     host: process.env.SMTP_HOST,
     port: process.env.SMTP_PORT,
     auth: {
          user: process.env.SMTP_MAIL,
          pass: process.env.SMTP_PASS,
     },
});

export default transporter;
