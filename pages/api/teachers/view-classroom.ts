import executeQuery from "../../../config/db";
import { getCourseOne } from "../../../lib/client/query";

export default async function handler(req, res) {
  const { classId } = req.body;
  const query = getCourseOne(classId);
  console.log({ query });
  if (!query)
    res.send({
      status: "fail",
      errorMessage: "incomplete query",
    });
  try {
    const response: any = await executeQuery(query);
    console.log({ response });
    if (response[0])
      res.send({
        status: "success",
        data: response[0],
      });
    else
      res.send({
        status: "fail",
        message: response.error.toString(),
      });
  } catch (err) {
    res.send({
      status: "fail",
      message: "Caught an error",
      erroMressage: err.toString(),
    });
  }
}
