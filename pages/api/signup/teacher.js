import executeQuery from "../../../config/db";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { v4 as uuidv4 } from "uuid";

export default async (req, res) => {
  try {
    const salt = bcrypt.genSaltSync(10);
    const hashedPassword = await bcrypt.hash(req.body.password, salt);
    console.log(hashedPassword + "<--hashed");
    const uniqueId = uuidv4();
    console.log("req nom", req.body);
    const result = await executeQuery({
      query:
        "INSERT INTO Teachers VALUES('" +
        uniqueId +
        "','" +
        req.body.name +
        "',NULL,NULL,'" +
        req.body.email +
        "','" +
        req.body.department +
        "',NULL,'" +
        hashedPassword +
        "')",
      // "INSERT INTO admins VALUES('" +
      // uniqueId +
      // "','" +
      // req.body.email +
      // "','" +
      // req.body.name +
      // "','" +
      // hashedPassword +
      // "')",
    });
    console.log("ttt", result);
  } catch (error) {
    console.log(error);
  }
};
