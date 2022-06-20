import SendMail from "../../../lib/server/mail";
import createToken from "../../../lib/server/token";

export default async function handler(req, res) {
  const { email, name } = req.body;
  const token = createToken(email, name);
  const subject = "Code from Classademia";
  const text = `Activation link`;
  const html = `<a href="http://localhost:3000/api/auth/${token}">Activate account now</a>`;
  try {
    const response = await SendMail(email, subject, text, html);
    const { status } = response;
    console.log("here");
    console.log(status);
    if (status === "success")
      res.send({
        status: "success",
        message: "email sent successfully",
      });
    else {
      const { error } = response;
      res.send({
        status: "fail",
        message: "please try again",
        errorMessage: error,
      });
    }
  } catch (err) {
    console.log(err);
    res.send({
      status: "fail",
      message: "email was not sent",
      errorMessage: err,
    });
  }
}
