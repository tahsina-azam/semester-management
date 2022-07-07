import executeQuery from "../../../config/db";
import { v4 as uuidv4 } from "uuid";

function getClassId() {
  return Math.floor(100000 + Math.random() * 900000);
}

function checkDuplicates(classId) {
  const duplicates: any = executeQuery({
    query: "SELECT * FROM courses WHERE c_id='" + classId + "' ",
  });
  //console.log("duplicates" + duplicates.length());
  if (duplicates.length === 0) {
    return true;
  }
  return false;
}

export default async (req, res) => {
  try {
    let today = new Date();
    let dd = String(today.getDate()).padStart(2, "0");
    let mm = String(today.getMonth() + 1).padStart(2, "0"); //January is 0!
    let yyyy = today.getFullYear();
    let todayString = mm + "/" + dd + "/" + yyyy;
    const uniqueId = uuidv4();
    const { title, code, credit, year, semester, subject, t_id } = req.body.data;
    const classId = getClassId().toString();
    const if_same_year: any = await executeQuery({
      query:
        "SELECT s_date FROM semesters WHERE s_order='" +
        semester +
        "' AND s_year='" +
        year +
        "'",
    });
    if (if_same_year.length > 0 && if_same_year[0].s_date != yyyy) {
      await executeQuery({
        query:
          "INSERT INTO semesters VALUES('" +
          uniqueId +
          "','" +
          semester +
          "','" +
          year +
          "','" +
          yyyy +
          "')",
      });
    }
    console.log("body");
    console.log(req.body);
    const result: any = await executeQuery({
      query:
        "INSERT INTO courses VALUES('" +
        classId +
        "','" +
        code +
        "','" +
        credit +
        "','" +
        subject +
        "','" +
        title +
        "','" +
        todayString +
        "','" +
        t_id +
        "')",
    });
    console.log("a");
    console.log({
      query:
        "INSERT INTO courses VALUES('" +
        classId +
        "','" +
        code +
        "','" +
        credit +
        "','" +
        subject +
        "','" +
        title +
        "','" +
        todayString +
        "','" +
        t_id +
        "')",
    });
    console.log({ result });
    //console.log({result_semester});
    if (result.error)
      return res.send({
        status: "fail",
        message: "Course creation failed! Please try again.",
        errorMessage: result.error.toString(),
      });
    return res.send({
      status: "success",
      message: "Course is created!",
      link: `/teachers/classroom/${classId}`,
    });
  } catch (error) {
    console.log({ error });
    return res.send({
      status: "fail",
      message: "Course creation failed! Please try again.",
      errorMessage: error.toString(),
    });
  }
};
