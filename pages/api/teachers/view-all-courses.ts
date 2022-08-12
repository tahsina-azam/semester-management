import executeQuery from "../../../config/db";

export default async (req, res) => {
  try {
    console.log(req.body);

    var sql = "SELECT * FROM courses WHERE t_id='" + req.body.id + "'";
    const response = await executeQuery({ query: sql, values: [] });
    console.log({ response });
    if (!response[0]) {
      return res.send({
        status: "fail",
        message: "couldn't find",
      });
    }
    sql = "SELECT * FROM teachers WHERE id='" + req.body.id + "'";
    const teacher_name = await executeQuery({ query: sql, values: [] });
    console.log({ teacher_name });
    if (teacher_name[0])
      return res.send({
        status: "success",
        data: response,
        teacher_name: teacher_name[0].name,
      });
    else
      return res.send({
        status: "fail",
        message: "couldn't find",
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
