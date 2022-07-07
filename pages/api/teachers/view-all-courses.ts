import { db } from "../../../config/db";

export default async (req, res) => {
  try {
    console.log("req nom", req.body);

    var sql = "SELECT * FROM courses WHERE t_id='" + req.body.id + "'";
    db.query(sql, function (err, result) {
      if (err) {
        console.log(err);
        return res.send({
          status: "fail to get courses",
          message: "try again",
          errorMessage: err,
        });
      } else {
        return res.send({
          status: "successs",
          message: "successfully fetched courses",
          result: result,
        });
      }
    });
  } catch (err) {
    console.log(err);
    res.status(400).send({
      status: "fail",
      message: "try again",
      errorMessage: err,
    });
  }
};
