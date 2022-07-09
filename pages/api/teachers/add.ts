import executeQuery from "../../../config/db";
import { insertCourseOne } from "../../../lib/client/query";

export default async function (
  req: {
    body: {
      data: {
        rte: string;
        title: string;
        score: number;
        timeStampDate: any;
        c_id: string;
      };
    };
  },
  res: any
) {
  const { data } = req.body;
  const query = insertCourseOne(data);
  console.log({ query });
  try {
    const response: any = await executeQuery(query);
    console.log({ response });
    if (response.affectedRows)
      res.send({
        status: "success",
      });
    else
      res.send({
        status: "fail",
        message: "Couldn't insert data",
      });
  } catch (err) {
    res.send({
      status: "fail",
      message: "Error occured. Please try again.",
      errorMessage: err.toString(),
    });
  }
}
