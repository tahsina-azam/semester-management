import executeQuery from "../../../config/db";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
export default async (req, res) => {
  try {
    //console.log("req nom", req.body.password);
    const result = await executeQuery({
      query:
        "SELECT password FROM Users WHERE email='" +
        req.body.email +
        "'UNION ALL SELECT password FROM Teachers WHERE email='" +
        req.body.email +
        "'UNION ALL SELECT password FROM Admins WHERE email='" +
        req.body.email +
        "'",
    });
    const student = await executeQuery({
      query: "SELECT * FROM Users WHERE email='" + req.body.email + "'",
    });
    const teacher = await executeQuery({
      query: "SELECT * FROM Teachers WHERE email='" + req.body.email + "'",
    });
    const admin = await executeQuery({
      query: "SELECT * FROM Admins WHERE email='" + req.body.email + "'",
    });
    console.log("ttt", result);
    if (result.length > 0) {
      if (!(await bcrypt.compare(req.body.password, result[0].password))) {
        return res.status(400).send({
          message: "invalid password",
        });
      } else {
        console.log("password matched");
      }
    } else {
      return res.status(400).send({
        message: "invalid credentials",
      });
    }
  } catch (error) {
    console.log(error);
  }
};

//admin->tahsina72@student.sust.edu->123
//teacher->pinky@gmail.com->12
//student->tahsina.sheeva@gmail.com->1234
