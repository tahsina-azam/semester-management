import nanoidCode from "../../../lib/common/nanoid";
import SendMail from "../../../lib/server/mail";

export default async function handler(req, res) {
  const { email } = req.body;
  const subject = "Codefrom Classademia";
  const text =
    `Activation link : <a target="_" href="http://localhost:3000/api/auth/[email]" ></a>` +
    code;
  const html = "<strong>Welcome to Classademia</strong>";
  try {
    const response = await SendMail(email, subject, text, html);
    console.log("here");
    return {
      status: "success",
    };
  } catch (err) {
    console.log(err);
    return {
      status: "fail",
    };
  }
}
