import ENV from "../../../lib/server/env";
import jwt from "jsonwebtoken";
import axios from "axios";
interface jwtPayload {
  email: string;
  name: string;
}
import executeQuery from "../../../config/db";
export default async function handler(req, res) {
  const { token } = await req.query;
  console.log("in the correct place");
  try {
    console.log(token);
    const data = jwt.verify(token, ENV.JWT_SECRET) as jwtPayload;
    console.log(data);
    if (data.email != null) {
      // axios
      //   .post("/api/signup/verify", data)
      //   .then((response) => {
      //     console.log(response);
      //   })
      //   .catch((e) => {
      //     console.log(e);
      //   });
      try {
        //console.log("req nom", req.body);
        const result = await executeQuery({
          query:
            "UPDATE users SET is_verified='true' WHERE email='" +
            data.email +
            "'",
        });
        const resultT = await executeQuery({
          query:
            "UPDATE teachers SET is_verified='true' WHERE email='" +
            data.email +
            "'",
        });
        console.log("ttt", result, resultT);
        return res.send({
          status: "success",
          message: "successfully verified, please login",
        });
      } catch (error) {
        console.log(error);
        return res.send({
          status: "error",
          message: "something went wrong, please try again later",
        });
      }
    }
    res.send(
      `<html>Your account was activated. You are being redirected...<script>window.location.replace("/")</script></html>`
    );
  } catch (err) {
    console.log(err);
    res.send(
      `<html>our account activation was failed. You are being redirected...<script>window.location.replace("/")</script></html>`
    );
  }
}
