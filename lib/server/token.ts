import jwt from "jsonwebtoken";
import ENV from "./env";
export default function createToken(email: string, name: string) {
  console.log(process.env.JWT_SECRET);
  const token = jwt.sign(
    {
      email,
      name,
    },
    ENV.JWT_SECRET,
    { algorithm: "HS256", expiresIn: "3h" }
  );

  return token;
}
