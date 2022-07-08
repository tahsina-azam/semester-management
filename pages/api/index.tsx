import executeQuery from "../../config/db";
import { getTeacherOne } from "../../lib/client/query";

export default async function handler(req, res) {
  const { id } = req.body;
  try {
    const query = getTeacherOne(id);
    const response = await executeQuery(query);
    if (response[0])
      res.send({
        status: "success",
        data: response[0],
      });
    else
      res.send({
        status: "fail",
        message: "response not found",
      });
  } catch (err) {
    res.send({
      status: "fail",
      message: "error occured",
      erroMessage: err.toString(),
    });
  }
}
