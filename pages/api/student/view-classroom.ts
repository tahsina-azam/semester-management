import executeQuery from "../../../config/db";
import { db } from "../../../config/db";
export default async (req, res) => {
  try {
    console.log("req nom", req.body);
    // const result = await executeQuery({
    //   query: "SELECT * FROM courses WHERE c_id='" + req.body.code + "'",
    // });
    // console.log("ttt", result);
    var sql = "SELECT * FROM courses WHERE c_id='" + req.body.code + "'";

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
                return res.send({
                  status: "successs",
                  message: "successfully registered teacher",
                  result: result,
                  post: posts,
                  task: tasks,
                });
              }
            });
            // return res.send({
            //   status: "successs",
            //   message: "successfully registered teacher",
            //   result: result,
            //   post: posts,
            // });
          }
        });
        // return res.send({
        //   status: "successs",
        //   message: "successfully registered teacher",
        //   result: result,
        // });
      }
    });
  } catch (error) {
    console.log(error);
  }
};
