import executeQuery from "../../../config/db";
import bcrypt from "bcryptjs";
export default async (req, res) => {
  try {
    const salt = bcrypt.genSaltSync(10);
    const hashedPassword = await bcrypt.hash(req.body.password, salt);
    console.log(hashedPassword + "<--hashed");
    console.log("req nom", req.body);
    const result = await executeQuery({
      query:
        "INSERT INTO users VALUES('" +
        req.body.regnum +
        "','" +
        req.body.name +
        "',NULL,NULL,'" +
        req.body.email +
        "','" +
        hashedPassword +
        "',NULL)",
    });
    console.log("ttt", result);
  } catch (error) {
    console.log(error);
  }
};
