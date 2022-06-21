import sgMail from "@sendgrid/mail";
import nodemailer from "nodemailer";
import ENV from "./env";
// sgMail.setApiKey(ENV.SENDGRID_API_KEY);
// export default async function SendMail(
//   to: string,
//   subject: string,
//   text: string,
//   html: string
// ) {
//   console.log(`email in sending mail ${to}`);
//   const msg = {
//     to,
//     from: "nowshin22@student.sust.edu",
//     subject,
//     text,
//     html,
//   };
//   try {
//     const response = await sgMail.send(msg);
//     console.log("Email sent");
//     return { status: "success" };
//   } catch (error) {
//     console.error(error);
//     return { status: "fail", error };
//   }
// }
const transport = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: ENV.SENDER_EMAIL,
    pass: ENV.SENDER_EMAIL_PASSWORD,
  },
});
export default async function sendMailViaNodeMailer(
  to: string,
  subject: string,
  text: string,
  html: string
) {
  const mailOptions = {
    from: "nowshin22@student.sust.edu",
    to,
    subject,
    text,
    html,
  };
  try {
    const response = await transport.sendMail(
      mailOptions,
      function (err: any, info: any) {
        if (err) {
          console.log(err);
          return {
            status: "fail",
          };
        } else {
          console.log(info);
          return {
            status: "success",
          };
        }
      }
    );
    return {
      status: "success",
    };
  } catch (err) {
    return {
      status: "fail",
      error: err,
    };
  }
}
