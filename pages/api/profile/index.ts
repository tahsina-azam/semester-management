import executeQuery from "../../../config/db";
export default async (req, res) => {
  var result;
  try {
    console.log("req nom", req.body);
    if (req.body.role === "admin") {
      result = await executeQuery({
        query: "SELECT * FROM admins WHERE email='" + req.body.email + "'",
        values: [],
      });
    } else if (req.body.role === "teacher") {
      result = await executeQuery({
        query: "SELECT * FROM teachers WHERE email='" + req.body.email + "'",
        values: [],
      });
    } else {
      result = await executeQuery({
        query: "SELECT * FROM users WHERE email='" + req.body.email + "'",
        values: [],
      });
    }

    console.log("ttt", result);
    return res.send({
      result: result[0],
    });
  } catch (error) {
    console.log(error);
  }
};
