import executeQuery from "../../../config/db";
export default async (req, res) => {
  try {
    console.log("req nom", req.body);
    const result = await executeQuery({
      query: "SELECT * FROM Courses WHERE c_id='" + req.body.code + "'",
    });
    console.log("ttt", result);
    return res.send({
      result: result,
    });
  } catch (error) {
    console.log(error);
  }
};