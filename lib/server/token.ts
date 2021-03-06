import jwt from "jsonwebtoken";
import ENV from "./env";
export default function createToken(email: string, name: string, role: string) {
  console.log(ENV.JWT_SECRET);
  const token = jwt.sign(
    {
      email,
      name,
      role,
    },
    ENV.JWT_SECRET,
    {
      algorithm: "HS256",
    }
  );
  console.log("Created");
  console.log({ token });

  return token;
}
