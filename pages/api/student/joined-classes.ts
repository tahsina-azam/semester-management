import { db } from "../../../config/db";

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
        await db.query(sql2, function (err, result) {
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
              res.send({
                status: "success",
                message: "successfully fetched joined classes",
                result: result,
                class_details: class_details,
              });
            }
          });
          console.log({ result });
          // res.send({
          //   status: "success",
          //   message: "successfully fetched joined classes",
          //   result: result,
          // });
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
