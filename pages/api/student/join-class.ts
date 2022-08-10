import executeQuery from "../../../config/db";
export default async (req, res) => {
  try {
    console.log("req nom", req.body);
    var result = await executeQuery({
      query: "SELECT * FROM courses WHERE c_id='" + req.body.code + "'",
      values: [],
    });
    console.log("ttt", result);

    if (Array.isArray(result) && result.length > 0) {
      var feed = { class_code: req.body.code };
      var data = [];
      const student = await executeQuery({
        query: "SELECT * FROM users WHERE email='" + req.body.email + "'",
        values: [],
      });
      const if_already_exist = await executeQuery({
        query:
          "SELECT * FROM controller3 WHERE id='" +
          student[0].class_id +
          "' AND c_id='" +
          req.body.code +
          "'",
        values: [],
      });
      console.log(if_already_exist);
      if (Array.isArray(if_already_exist) && if_already_exist.length <= 0) {
        const insert = await executeQuery({
          query:
            "INSERT INTO controller3 (id,c_id) VALUES('" +
            student[0].class_id +
            "','" +
            result[0].c_id +
            "')",
          values: [],
        });
        console.log(insert);
      }

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
