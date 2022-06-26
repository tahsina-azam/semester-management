import ENV from "../../../lib/server/env";
import jwt from "jsonwebtoken";
interface jwtPayload {
  email: string;
  name: string;
}
export default async function handler(req, res) {
  const { token } = await req.query;
  console.log("in the correct place");
  try {
    console.log(req.query);
    const data = jwt.verify(req.query.token, ENV.JWT_SECRET) as jwtPayload;
    console.log(data.email);
    res.send(
      `<html>Your account was activated. You are being redirected...<script>window.location.replace("/sign-in")</script></html>`
    );
  } catch (err) {
    console.log(err);
    res.send(
      `<html>our account activation was failed. You are being redirected...<script>window.location.replace("/sign-up")</script></html>`
    );
  }
}
//////////