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
    console.log("ttt", result);
    res.send({
      status: "success",
<<<<<<< HEAD
      message: "successfully registered student",
    });
=======
      message: "successfully registered student"
    })
>>>>>>> fdf9011b31e03f460140b5453e48d26e475abaab
  } catch (error) {
    console.log(error);
    res.status(400).send({
      status: "fail",
      message: "Please try again",
      errorMessage: err,
    });
  }
}
