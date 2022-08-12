import { db } from "../../../config/db";
export default async (req, res) => {
  try {
    console.log(req.body);
    var sql;
    if (req.body.type === "update") {
      if (req.body.table === "posts") {
        sql =
          "UPDATE `" +
          req.body.table +
          "` SET content='" +
          req.body.content +
          "',title='" +
          req.body.title +
          "' WHERE id='" +
          req.body.id +
          "'";
      } else if (req.body.table === "tasks") {
        sql =
          "UPDATE `" +
          req.body.table +
          "` SET description='" +
          req.body.description +
          "',deadline='" +
          req.body.deadline +
          "',score='" +
          req.body.score +
          "',title='" +
          req.body.title +
          "' WHERE id='" +
          req.body.id +
          "'";
      } else if (req.body.table === "resources") {
        sql =
          "UPDATE `" +
          req.body.table +
          "` SET description='" +
          req.body.description +
          "' WHERE id='" +
          req.body.id +
          "'";
      } else {
        return res.send({
          status: "fail",
          message: "Make sure you sent data in the correct format.",
          errorMessage: "Make sure you sent data in the correct format.",
        });
      }
      db.query(sql, function (err, result) {
        console.log({ result });
        if (err) {
          console.log(err);
          return res.send({
            status: "fail",
            message: "Failed to update",
            errorMessage: err,
          });
        } else {
          return res.send({
            status: "success",
            message: "Successfully updated your '" + req.body.table + "'",
          });
        }
      });
    } else if (req.body.type === "delete") {
      sql =
        "DELETE FROM `" + req.body.table + "` WHERE id='" + req.body.id + "'";
      db.query(sql, function (err, result) {
        console.log({ result });
        if (err) {
          console.log(err);
          return res.send({
            status: "fail",
            message: "Failed to delete",
            errorMessage: err,
          });
        } else {
          return res.send({
            status: "success",
            message: "Successfully deleted data",
          });
        }
      });
    } else {
      return res.send({
        status: "fail",
        message: "Make sure you sent data in the correct format.",
        errorMessage: "Make sure you sent data in the correct format.",
      });
    }
  } catch (err) {
    console.log(err);
    return res.status(400).send({
      status: "fail",
      message: "try again",
      errorMessage: err,
    });
  }
};
