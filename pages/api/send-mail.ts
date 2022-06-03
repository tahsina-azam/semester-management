import SendMail from "../../lib/server/mail";
export default async function handler(req, res) {
  const {email, subject, text, html} = req.body;
  try {
    const response = SendMail(email, subject, text, html);
    console.log("Email sent");
    res.json(response)
  } catch (error) {
    console.error(error);
    res.json("false")
  }
}
