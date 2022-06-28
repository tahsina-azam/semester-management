import executeQuery from "../../../config/db";
import bcrypt from "bcryptjs";
export default async function handler(req, res) {
  const { email, password, regnum, name } = req.body;
  try {
    const salt = bcrypt.genSaltSync(10);
    const hashedPassword = await bcrypt.hash(password, salt);
    const class_id = Date.now();
    console.log(hashedPassword + "<--hashed password");
    console.log("req nom", req.body);
    const if_already_exist = await executeQuery({
      query:
        "SELECT * FROM users WHERE email='" +
        email +
        "' OR reg_no='" +
        regnum +
        "'",
    });
    if (if_already_exist.length > 0) {
      console.log("already exist");
      res.send({
        status: "fail",
        message:
          "These credentials already exist please submit again carefully",
      });
    } else {
      const result = await executeQuery({
        query:
          "INSERT INTO users VALUES('" +
          regnum +
          "','" +
          name +
          "',NULL,NULL,'" +
          email +
          "','" +
          hashedPassword +
          "','" +
          class_id +
          "','false')",
      });
      const controller = await executeQuery({
        query: "INSERT INTO controller2 VALUES('" + class_id + "',NULL)",
      });
      if (!result) {
        throw new Error("Insert error");
      }
      console.log("ttt", result);
      res.send({
        status: "success",
        message: "successfully registered student",
      });
    }
  } catch (error) {
    console.log(error);
    res.send({
      status: "fail",
      message: "Please try again",
      errorMessage: error,
    });
  }
}
