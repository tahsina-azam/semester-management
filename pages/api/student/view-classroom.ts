import executeQuery from "../../../config/db";
import { db } from "../../../config/db";
export default async (req, res) => {
  try {
    console.log("req nom", req.query);
    var desired_class = [];
    var sql =
      "SELECT courses.c_id,courses.c_code,courses.c_credit,courses.s_subject,courses.c_title,courses.c_date,teachers.name ,teachers.email FROM courses LEFT JOIN teachers ON courses.t_id=teachers.id";

    db.query(sql, function (err, result) {
      console.log({result})
      if (err) {
        console.log(err);
        return res.send({
          status: "fail",
          message: "Failed to find a course with this ID!",
          errorMessage: err,
        });
      } 
        sql = "SELECT * FROM posts WHERE c_id='" + req.query.classId + "'";
        db.query(sql, function (err, posts) {
          console.log({posts})
          if (err) {
            console.log(err);
            return res.send({
              status: "fail",
              message: "Failed to find a course with this ID!",
              errorMessage: err,
            });
          } 
            sql = "SELECT * FROM tasks WHERE c_id='" + req.query.classId + "'";
            db.query(sql, function (err, tasks) {
              console.log({tasks})
              if (err) {
                console.log(err);
                return res.send({
                  status: "fail",
                  message: "Failed to find a course with this ID!",
                  errorMessage: err,
                });
              } 
                result.map((courses) => {
                  if (courses.c_id === req.query.classId) {
                    desired_class.push(courses);
                  }
                });
                return res.send({
                  status: "success",
                  message: "successfully found classes",
                  result: desired_class,
                  posts: posts[0]?posts:[],
                  tasks: tasks[0]?tasks:[],
                });
            
            });
      
        });

    });
  } catch (error) {
    console.log(error);
    return res.send({
      status: "fail",
      message: "Failed to find a course with this ID!",
      errorMessage: error,
    });
  }
};