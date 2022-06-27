import executeQuery from "../../../config/db";
export default async (req, res) => {
  try {
    console.log("req nom", req.body);
    const result = await executeQuery({
      query: "SELECT * FROM Courses WHERE c_id='" + req.body.code + "'",
    });
    console.log("ttt", result);

    if (result.length > 0) {
      var feed = { class_code: req.body.code };
      var data = [];
      const student = await executeQuery({
        query: "SELECT * FROM Users WHERE email='" + req.body.email + "'",
      });
      const if_already_exist = await executeQuery({
        query:
          "SELECT * FROM controller3 WHERE id='" +
          student[0].class_id +
          "' AND c_id='" +
          req.body.code +
          "'",
      });
      console.log("if already exist->" + if_already_exist.length);
      if (if_already_exist.length === 0) {
        const result_semester = await executeQuery({
          query:
            "INSERT INTO controller3 VALUES('" +
            student[0].class_id +
            "','" +
            result[0].c_id +
            "')",
        });
        return res.send({
          result: result,
          link: "/student/classroom/" + req.body.code,
        });
      } else {
        return res.status(400).send({
          message: "You already joined the classroom",
        });
      }
    } else {
      return res.status(400).send({
        message: "Wrong Code",
      });
    }
  } catch (error) {
    console.log(error);
  }
};
