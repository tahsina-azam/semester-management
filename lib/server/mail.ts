import sgMail from "@sendgrid/mail";
sgMail.setApiKey(
  "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"
);
export default async function SendMail(
  to: string,
  subject: string,
  text: string,
  html: string
) {
  console.log(`email in sending mail ${to}`)
  const msg = {
    to: to, 
    from: "nowshin22@student.sust.edu",
    subject: subject,
    text: text,
    html: html,
  };
  try {
    const response = await sgMail.send(msg);
    console.log("Email sent");
  } catch (error) {
    console.error(error);
  }
}
