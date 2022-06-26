import executeQuery from "../../../config/db";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { v4 as uuidv4 } from "uuid";
import { stat } from "fs";

export default async (req, res) => {
  try {
    const salt = bcrypt.genSaltSync(10);
    const hashedPassword = await bcrypt.hash(req.body.password, salt);
    console.log(hashedPassword + "<--hashed");
    const uniqueId = uuidv4();
    console.log("req nom", req.body);
    const approval = "pending";
    const result = await executeQuery({
      query:
        "INSERT INTO teachers VALUES('" +
        uniqueId +
        "','" +
        req.body.name +
        "',NULL,NULL,'" +
        req.body.email +
        "','" +
        approval +
        "',NULL,'" +
        hashedPassword +
        "')",
    });
    console.log("ttt", result);
    res.send({
      status: "successs",
      message: "successfully registered teacher",
    });
  } catch (err) {
    console.log(err);
    res.send({
      status: "fail",
      message: "try agaun",
      errorMessage: err,
    });
  }
};
