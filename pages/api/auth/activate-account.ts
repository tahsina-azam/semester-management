// import SendMail from "../../../lib/server/mail";
import createToken from "../../../lib/server/token";
import sendMailViaNodeMailer from "../../../lib/server/mail";

export default async function handler(
  req: { body: { email: any; name: any } },
  res: {
    send: (arg0: {
      status: string;
      message: string;
      errorMessage?: any;
    }) => void;
  }
) {
  const { email, name } = req.body;
  const token = createToken(email, name);
  const subject = "Code from Classademia";
  const text = `Activation link`;
  const html = `<a href="http://localhost:3000/api/auth/${token}">Activate account now</a>`;
  try {
    const response = await sendMailViaNodeMailer(email, subject, text, html);
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
