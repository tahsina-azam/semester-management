import executeQuery from "../../../config/db";
export default async (req, res) => {
  try {
    console.log("req nom", req.body);
    const result = await executeQuery({
      query: "SELECT * FROM courses WHERE c_id='" + req.body.code + "'",
    });
    console.log("ttt", result);
    return res.send({
      status: "success",
      result: result,
    });
  } catch (error) {
    console.log(error);
    return res.send({
      status: "fail",
      error: error,
    });
  }
};
