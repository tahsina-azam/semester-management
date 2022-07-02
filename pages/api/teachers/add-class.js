import executeQuery from "../../../config/db";
import { v4 as uuidv4 } from "uuid";
import React from "react";

function getClassId() {
  return Math.floor(100000 + Math.random() * 900000);
}

function checkDuplicates(classId) {
  const duplicates = executeQuery({
    query: "SELECT * FROM courses WHERE c_id='" + classId + "' ",
  });
  console.log("duplicates" + duplicates.length());
  if (duplicates.length === 0) {
    return true;
  }
  return false;
}

export default async (req, res) => {
  try {
    var today = new Date();
    var dd = String(today.getDate()).padStart(2, "0");
    var mm = String(today.getMonth() + 1).padStart(2, "0"); //January is 0!
    var yyyy = today.getFullYear();
    today = mm + "/" + dd + "/" + yyyy;
    const uniqueId = uuidv4();

    const classId = getClassId().toString();
    const if_same_year = await executeQuery({
      query:
        "SELECT s_date FROM semesters WHERE s_order='" +
        req.body.semester +
        "' AND s_year='" +
        req.body.year +
        "'",
    });
    console.log("req nom", req.body);
    if (if_same_year.length > 0 && if_same_year[0].s_date != yyyy) {
      const result_semester = await executeQuery({
        query:
          "INSERT INTO semesters VALUES('" +
          uniqueId +
          "','" +
          req.body.semester +
          "','" +
          req.body.year +
          "','" +
          yyyy +
          "')",
      });
    }
    const result = await executeQuery({
      query:
        "INSERT INTO courses VALUES('" +
        classId +
        "','" +
        req.body.code +
        "','" +
        req.body.credit +
        "','" +
        req.body.subject +
        "','" +
        req.body.title +
        "','" +
        today +
        "','" +
        req.body.t_id +
        "')",
    });
    console.log("ttt", result);
    console.log("mmm", result_semester);
    res.send({
      status: "success",
      message: "Course is created!",
      link: `/teachers/classroom/${classId}`
    });
  } catch (error) {
    console.log(error);
    res.send({
      status: "fail",
      message: "Course creation failed! Please try again.",
      errorMessage: {error},
    });
  }
};
