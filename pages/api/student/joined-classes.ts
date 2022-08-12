import { db } from "../../../config/db";
import executeQuery from "../../../config/db";

export default async (req, res) => {
  try {
    console.log(req.body);
    const sql = "SELECT * FROM users WHERE reg_no='" + req.body.id + "'";
    await db.query(sql, async function (err, result) {
      if (err) {
        console.log(err);
        res.send({
          status: "fail",
          message: "try again",
          errorMessage: err,
        });
      }
      if (!result[0])
        res.send({
          status: "fail",
          message: "no sql found",
        });
      try {
        console.log(result[0]);
        const sql2 =
          "SELECT * FROM controller3 WHERE id='" + result[0].class_id + "'";
        await db.query(sql2, function (err, joinedCourses) {
          if (err) {
            console.log(err);
            res.send({
              status: "fail",
              message: "failed to fetch courses",
              errorMessage: err,
            });
          }
          const sql3 =
            "SELECT courses.c_id,courses.c_code,courses.c_credit,courses.s_subject,courses.c_title,courses.c_date,teachers.name COLLATE utf8mb4_unicode_ci ,teachers.email COLLATE utf8mb4_unicode_ci  FROM controller3 INNER JOIN courses ON controller3.c_id=courses.c_id LEFT JOIN teachers ON courses.t_id=teachers.id COLLATE utf8mb4_unicode_ci ";
          db.query(sql3, function (err, class_details) {
            if (err) {
              console.log(err);
              res.send({
                status: "fail",
                message: "failed to fetch course details",
                errorMessage: err,
              });
            } else {
              // --------------------------->check if semester is present
              const sql5 =
                "SELECT controller2.s_id FROM users INNER JOIN controller2 ON users.reg_no='" +
                req.body.id +
                "' AND controller2.id=users.class_id";
              const semester = executeQuery({ query: sql5, values: [] });
              console.log("semester is:->" + semester);
              if (semester[0] === null) {
                return res.send({
                  status: "success",
                  message: "successfully fetched joined classes",
                  result: joinedCourses,
                  data: class_details,
                  other_courses: "no semester",
                });
              }

              const sql4 =
                "SELECT courses.c_id,courses.c_code,courses.c_credit,courses.s_subject,courses.c_title,courses.c_date,teachers.name , teachers.email FROM users INNER JOIN controller2 ON users.reg_no='" +
                req.body.id +
                "' AND controller2.id=users.class_id INNER JOIN controller1 ON controller1.s_id=controller2.s_id INNER JOIN courses ON controller1.c_id=courses.c_id INNER JOIN teachers ON courses.t_id=teachers.id AND courses.c_id NOT IN (SELECT courses.c_id  FROM controller3 INNER JOIN courses ON controller3.c_id=courses.c_id)";
              db.query(sql4, function (err, other_courses) {
                if (err) {
                  console.log(err);
                  res.send({
                    status: "fail",
                    message: "failed to fetch course details",
                    errorMessage: err,
                  });
                } else {
                  if (!class_details[0])
                    res.send({
                      status: "fail",
                      message: "no sql found for class details",
                    });
                  return res.send({
                    status: "success",
                    message: "successfully fetched joined classes",
                    result: joinedCourses,
                    data: class_details,
                    other_courses: other_courses,
                  });
                }
              });
              // ------------------------->
              // res.send({
              //   status: "success",
              //   message: "successfully fetched joined classes",
              //   result: joinedCourses,
              //   class_details: class_details,
              // });
            }
            // if (!class_details[0])
            //   res.send({
            //     status: "fail",
            //     message: "no sql found for class details",
            //   });
            // res.send({
            //   status: "success",
            //   message: "successfully fetched joined classes",
            //   data: class_details,
            // });
          });
          console.log({ result });
        });
      } catch (error) {
        res.send({
          status: "fail",
          message: "try again",
          errorMessage: err,
        });
      }
    });
  } catch (err) {
    res.send({
      status: "fail",
      message: "try again",
      errorMessage: err,
    });
  }
};
