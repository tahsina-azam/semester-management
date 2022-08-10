import executeQuery from "../../../config/db";
import bcrypt from "bcryptjs";

export default async (req, res) => {
  const { email, password } = req.body;
  try {
    console.log("sign in response");
    console.log("req nom", req.body.password);
    const result = await executeQuery({
      query:
        "SELECT password FROM users WHERE email='" +
        email +
        "' UNION ALL SELECT password COLLATE utf8mb4_unicode_ci FROM teachers WHERE email='" +
        email +
        "' UNION ALL SELECT password FROM admins WHERE email='" +
        email +
        "'",
      values: [],
    });
    const teacher = await executeQuery({
      query: "SELECT * FROM teachers WHERE email='" + email + "'",
      values: [],
    });
    console.log("ttt", result);
    if (Array.isArray(result) && result.length > 0) {
      if (!(await bcrypt.compare(password, result[0].password))) {
        return res.status(400).send({
          status: "fail",
          message: "invalid password",
        });
      } else if (Array.isArray(teacher) && teacher.length > 0) {
        console.log(teacher[0].id);
        if (teacher[0].is_verified === "false") {
          return res.status(400).send({
            status: "not verified",
            message:
              "you're yet to be verified, make sure you got the verification mail",
          });
        } else if (teacher[0].status === "pending") {
          return res.status(400).send({
            status: "waiting",
            message: "your sign-up request is still pending",
          });
        } else {
          return res.send({
            teacher: teacher,
            status: "success",
            message: "login successful",
            link: "/teachers",
            data: {
              role: "teacher",
              name: teacher[0].name,
              id: teacher[0].id,
            },
          });
        }
      } else {
        const student = await executeQuery({
          query: "SELECT * FROM users WHERE email='" + email + "'",
          values: [],
        });

        const admin = await executeQuery({
          query: "SELECT * FROM admins WHERE email='" + email + "'",
          values: [],
        });
        if (Array.isArray(admin) && admin.length > 0) {
          return res.send({
            admin: admin,
            status: "success",
            message: "login successful",
            link: "/admins",
            data: {
              role: "admin",
              name: admin[0].name,
              id: admin[0].id,
            },
          });
        } else if (student[0].is_verified === "false") {
          return res.status(400).send({
            status: "not verified",
            message:
              "you're yet to be verified, make sure you got the verification mail",
          });
        } else {
          return res.send({
            student: student,
            status: "success",
            message: "login successful",
            link: "/student",
            data: {
              role: "student",
              name: student[0].name,
              id: student[0].reg_no,
            },
          });
        }
      }
    } else {
      return res.status(400).send({
        status: "fail",
        message: "invalid credentials",
      });
    }
  } catch (error) {
    console.log(error);
  }
};

//admin->tahsina72@student.sust.edu->123
//teacher->atahsinam@gmail.com->12345678
//student->tahsina.sheeva@gmail.com->12345678
//miko-miko@gmail.com->12
//chiko@gmail.com->12
