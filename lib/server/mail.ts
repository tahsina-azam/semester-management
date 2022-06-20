import sgMail from "@sendgrid/mail";
import ENV from "./env";
sgMail.setApiKey(ENV.SENDGRID_API_KEY);
export default async function SendMail(
  to: string,
  subject: string,
  text: string,
  html: string
) {
  console.log(`email in sending mail ${to}`);
  const msg = {
    to,
    from: "nowshin22@student.sust.edu",
    subject,
    text,
    html,
  };
  try {
    const response = await sgMail.send(msg);
    console.log("Email sent");
    return { status: "success" };
  } catch (error) {
    console.error(error);
    return { status: "fail", error };
  }
}
