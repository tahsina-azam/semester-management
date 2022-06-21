import ENV from "../../../lib/server/env";
import jwt from "jsonwebtoken";
interface jwtPayload {
  email: string;
}
export default async function handler(req, res) {
  const { token } = await req.query;
  console.log("in the correct place");
  try {
    console.log(token);
    const data = jwt.verify(token, ENV.JWT_SECRET) as jwtPayload;
    console.log(data.email);
    res.send({
      status: "success",
    });
  } catch (err) {
    console.log(err);
    res.send({
      status: "success",
    });
  }
}
