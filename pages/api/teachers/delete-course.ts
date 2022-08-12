import executeQuery from "../../../config/db";
import { deteleCourseOne } from "../../../lib/client/query";

export default async function (req, res) {
  const { id } = req.body;
  const query = deteleCourseOne({ id });
  console.log({ query });
  try {
    const response = executeQuery(query);
    console.log({ response });
    if (response) {
      res.send({
        status: "success",
      });
    } else {
      res.send({
        status: "fail",
      });
    }
  } catch (err) {
    res.send({
      status: "fail",
      message: "Please try again",
      errorMessage: err,
    });
  }
}
