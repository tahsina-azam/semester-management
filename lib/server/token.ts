import jwt from "jsonwebtoken";
export default function createToken(name: string, email: string) {
  const token = jwt.sign(
    {
      email,
      name,
    },
    "12345abcdef",
    { algorithm: "HS256",
  expiresIn: "3h" }
  );
  console.log(jwt.verify(token, "12345abcdef"));
  return token;
}
