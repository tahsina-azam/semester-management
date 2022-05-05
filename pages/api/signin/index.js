import executeQuery from "../../../config/db";
import bcrypt from "bcryptjs";

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
    const teacher = await executeQuery({
      query: "SELECT * FROM Teachers WHERE email='" + req.body.email + "'",
    });
    console.log("ttt", result);
    if (result.length > 0) {
      if (!(await bcrypt.compare(req.body.password, result[0].password))) {
        return res.status(400).send({
          message: "invalid password",
        });
      } else if (teacher.length > 0) {
        if (teacher[0].status === "pending") {
          return res.status(400).send({
            message: "your sign-up request is still pending",
          });
        } else {
          return res.send({
            teacher: teacher,
            message: "login successful",
            link: "/teachers/" + teacher[0].id,
          });
        }
      } else {
        const student = await executeQuery({
          query: "SELECT * FROM Users WHERE email='" + req.body.email + "'",
        });

        const admin = await executeQuery({
          query: "SELECT * FROM Admins WHERE email='" + req.body.email + "'",
        });
        if (admin.length > 0) {
          return res.send({
            admin: admin,
            message: "login successful",
            link: "/admins/" + admin[0].id,
          });
        } else {
          return res.send({
            student: student,
            message: "login successful",
            link: "/student/" + student[0].reg_no,
          });
        }
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
//miko-miko@gmail.com->12
//chiko@gmail.com->12
