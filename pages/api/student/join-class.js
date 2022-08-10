import executeQuery from "../../../config/db";
export default async (req, res) => {
  try {
    console.log("req nom", req.body);
    const result = await executeQuery({
      query: "SELECT * FROM courses WHERE c_id='" + req.body.code + "'",
    });
    console.log("ttt", result);

    if (result.length > 0) {
      var feed = { class_code: req.body.code };
      var data = [];
      const student = await executeQuery({
        query: "SELECT * FROM users WHERE email='" + req.body.email + "'",
      });
      const if_already_exist = await executeQuery({
        query:
          "SELECT * FROM controller3 WHERE id='" +
          student[0].class_id +
          "' AND c_id='" +
          result[0].c_id +
          "')",
      });
      if (if_already_exist.length <= 0) {
        const insert = await executeQuery({
          query:
            "INSERT INTO controller3 VALUES('" +
            student[0].class_id +
            "','" +
            result[0].c_id +
            "')",
        });
      }
      console.log(insert);
      return res.send({
        status: "success",
        message: "Welcome to the course!",
        result: result,
        link: "/student/classroom/" + req.body.code,
      });
    }
    return res.status(400).send({
      status: "fail",
      message: "Please try again with a correct code.",
    });
  } catch (error) {
    console.log(error);
    return res.status(400).send({
      status: "fail",
      message: "Please try again.",
    });
  }
};
