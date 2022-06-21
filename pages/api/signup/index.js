import executeQuery from "../../../config/db";
import bcrypt from "bcryptjs";
export default async function handler(req, res) {
  const { email, password, regnum, name } = req.body;
  try {
    const salt = bcrypt.genSaltSync(10);
    const hashedPassword = await bcrypt.hash(password, salt);
    console.log(hashedPassword + "<--hashed password");
    console.log("req nom", req.body);
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
        "',NULL)",
    });
    console.log("ttt", result);
    res.send({
      status: "success"
    })
  } catch (error) {
    console.log(error);
    res.status(400).send({
      status: "fail",
      message: "Please try again",
      errorMessage: err
    })
  }
};
