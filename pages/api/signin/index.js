import executeQuery from "../../../config/db";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
export default async (req, res) => {
  try {
    console.log("req nom", req.body.password);
    const result = await executeQuery({
      query: "SELECT password FROM Users WHERE email='" + req.body.email + "'",
    });
    console.log("ttt", result[0].password);
    if (result) {
      if (!(await bcrypt.compare(req.body.password, result[0].password))) {
        return res.status(400).send({
          message: "invalid credentials",
        });
      } else {
        console.log("password matched");
      }
    }
  } catch (error) {
    console.log(error);
  }
};
