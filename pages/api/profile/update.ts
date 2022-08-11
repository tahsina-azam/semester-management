import executeQuery from "../../../config/db";
import { db } from "../../../config/db";
export default async (req, res) => {
  var sql;
  try {
    console.log("req nom", req.body);
    if (req.body.role === "admin") {
      sql =
        "UPDATE admins SET name='" +
        req.body.name +
        "' WHERE email='" +
        req.body.email +
        "'";
      db.query(sql, function (err, result) {
        console.log({ result });
        if (err) {
          console.log(err);
          return res.send({
            status: "fail",
            message: "Failed to find a post with this ID!",
            errorMessage: err,
          });
        } else {
          return res.send({
            status: "success",
            message: "Successfully updated your account",
          });
        }
      });
    } else if (req.body.role === "teacher") {
      sql =
        "UPDATE teachers SET name='" +
        req.body.name +
        "',phone='" +
        req.body.phone +
        "',about='" +
        req.body.about +
        "' WHERE email='" +
        req.body.email +
        "'";
      db.query(sql, function (err, result) {
        console.log({ result });
        if (err) {
          console.log(err);
          return res.send({
            status: "fail",
            message: "Failed to find a post with this ID!",
            errorMessage: err,
          });
        } else {
          return res.send({
            status: "success",
            message: "Successfully updated your account",
          });
        }
      });
    } else {
      sql =
        "UPDATE users SET name='" +
        req.body.name +
        "',phone='" +
        req.body.phone +
        "',about='" +
        req.body.about +
        "' WHERE email='" +
        req.body.email +
        "'";
      db.query(sql, function (err, result) {
        console.log({ result });
        if (err) {
          console.log(err);
          return res.send({
            status: "fail",
            message: "Failed to find a post with this ID!",
            errorMessage: err,
          });
        }
      });
      const user = await executeQuery({
        query: "SELECT * FROM users WHERE email='" + req.body.email + "'",
        values: [],
      });
      if (Array.isArray(user) && user.length <= 0) {
        return res.send({
          status: "fail",
          message: "Failed to find a post with this ID!",
          errorMessage: "something went wrong, account update unsuccessful",
        });
      }
      sql =
        "UPDATE controller2 SET s_id='" +
        req.body.semester +
        "' WHERE id='" +
        user[0].class_id +
        "'";
      db.query(sql, function (err, result) {
        console.log({ result });
        if (err) {
          console.log(err);
          return res.send({
            status: "fail",
            message: "Failed to find a post with this ID!",
            errorMessage: err,
          });
        } else {
          return res.send({
            status: "success",
            message: "Successfully updated your account",
          });
        }
      });
    }
  } catch (error) {
    console.log(error);
  }
};
