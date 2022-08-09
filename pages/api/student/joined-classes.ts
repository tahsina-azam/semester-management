import executeQuery from "../../../config/db";
import { db } from "../../../config/db";

export default async (req, res) => {
  try {
    console.log(req.body.data);
    const sql = "SELECT * FROM users WHERE reg_no='" + req.body.data + "'";
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
        console.log(result[0])
        const sql2 =
          "SELECT * FROM controller3 WHERE id='" + result[0].class_id + "'";
        await db.query(sql2, function (err, result) {
          if (err) {
            console.log(err);
            res.send({
              status: "fail",
              message: "try again",
              errorMessage: err,
            });
          }
          console.log({result})
          res.send({
            status: "successs",
            message: "successfully fetched joined classes",
            result: result,
          });
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
