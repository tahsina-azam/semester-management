import executeQuery from "../../../config/db";
import { db } from "../../../config/db";
export default async (req, res) => {
  try {
    console.log("req nom", req.query);
    var sql = "SELECT * FROM courses WHERE c_id='" + req.query.classId + "'";

    db.query(sql, function (err, result) {
      if (err)
        return res.send({
          status: "fail",
          message: "Failed to find a course with this ID! with error",
          errorMessage: err,
        });
      if (!result[0])
        return res.send({
          status: "fail",
          message: "Failed to find a course with this ID!",
        });
      console.log({ result });
      sql = "SELECT * FROM posts WHERE c_id='" + req.query.classId + "'";
      db.query(sql, function (err, posts) {
        if (err)
          return res.send({
            status: "fail",
            message: "Failed to find a post with this ID!",
            errorMessage: err,
          });
        if (!posts[0])
          return res.send({
            status: "success",
            data: result,
            posts: [],
            tasks: [],
            message: "Failed to find a post with this ID!",
          });

        sql = "SELECT * FROM tasks WHERE c_id='" + req.query.classId + "'";
        db.query(sql, function (err, tasks) {
          if (err)
            return res.send({
              status: "fail",
              message: "Failed to find a task with this ID!",
              errorMessage: err,
            });
          console.log({ tasks });
          if (!tasks[0])
            return res.send({
              status: "success",
              data: result,
              posts: posts,
              tasks: [],
              message: "Failed to find a task with this ID!",
            });

          return res.send({
            status: "success",
            message: "successfully found",
            data: result,
            posts: posts,
            tasks: tasks,
          });
        });
      });
    });
  } catch (error) {
    console.log(error);
    res.send({
      status: "fail",
      message: "Failed to find a course with this ID!",
      errorMessage: error,
    });
  }
};
