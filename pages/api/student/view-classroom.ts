import executeQuery from "../../../config/db";
import { db } from "../../../config/db";
export default async (req, res) => {
  try {
    console.log("req nom", req.body);
    var desired_class = [];
    var sql =
      "SELECT courses.c_id,courses.c_code,courses.c_credit,courses.s_subject,courses.c_title,courses.c_date,teachers.name ,teachers.email FROM courses LEFT JOIN teachers ON courses.t_id=teachers.id COLLATE utf8mb4_0900_ai_ci ";

    db.query(sql, function (err, result) {
      if (err) {
        console.log(err);
        return res.send({
          status: "fail",
          message: "Failed to find a course with this ID!",
          errorMessage: err,
        });
      } else {
        sql = "SELECT * FROM posts WHERE c_id='" + req.body.code + "'";
        db.query(sql, function (err, posts) {
          if (err) {
            console.log(err);
            return res.send({
              status: "fail",
              message: "Failed to find a course with this ID!",
              errorMessage: err,
            });
          } else {
            sql = "SELECT * FROM tasks WHERE c_id='" + req.body.code + "'";
            db.query(sql, function (err, tasks) {
              if (err) {
                console.log(err);
                return res.send({
                  status: "fail",
                  message: "Failed to find a course with this ID!",
                  errorMessage: err,
                });
              } else {
                result.map((courses) => {
                  if (courses.c_id === req.body.code) {
                    desired_class.push(courses);
                  }
                });
                return res.send({
                  status: "successs",
                  message: "successfully registered teacher",
                  result: desired_class,
                  post: posts,
                  task: tasks,
                });
              }
            });
          }
        });
      }
    });
  } catch (error) {
    console.log(error);
  }
};
