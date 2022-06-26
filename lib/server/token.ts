import jwt from "jsonwebtoken";
import ENV from "./env";
<<<<<<< HEAD
export default function createToken(email: string, name: string, role: string) {
=======
export default function createToken(email: string, name: string) {
>>>>>>> fdf9011b31e03f460140b5453e48d26e475abaab
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
<<<<<<< HEAD
  console.log({ token });
=======
  console.log({token});
>>>>>>> fdf9011b31e03f460140b5453e48d26e475abaab

  return token;
}
