import { db } from "../../../config/db";
export default async (req, res) => {
  try {
    console.log("req nom", req.body);
    var sql = "SELECT * FROM users WHERE reg_no='" + req.body.id + "'";
    db.query(sql, function (err, result) {
      if (err) {
        console.log(err);
        return res.send({
          status: "fail",
          message: "try again",
          errorMessage: err,
        });
      } else {
        var sql2 =
          "SELECT * FROM controller3 WHERE id='" + result[0].class_id + "'";
        db.query(sql2, function (err, result) {
          if (err) {
            console.log(err);
            return res.send({
              status: "fail",
              message: "try again",
              errorMessage: err,
            });
          } else {
            return res.send({
              status: "successs",
              message: "successfully fetched joined classes",
              result: result,
            });
          }
        });
      }
    });
  } catch (error) {
    console.log(error);
  }
};
