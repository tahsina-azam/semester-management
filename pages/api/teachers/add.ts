import executeQuery from "../../../config/db";
import { insertPostOne, insertTaskOne } from "../../../lib/client/query";

export default async function (
  req: {
    body: {
      data: {
        type: string;
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
  const sql = data.type === "task" ? insertTaskOne(data) : insertPostOne(data);
  console.log({ sql });
  try {
    const response: any = await executeQuery({ query: sql.query, values: [] });
    console.log({ response });
    if (response.affectedRows)
      res.json({
        status: "success",
      });
    else
      res.json({
        status: "fail",
        message: "Couldn't insert data",
      });
  } catch (err) {
    res.json({
      status: "fail",
      message: "Error occured. Please try again.",
      errorMessage: err.toString(),
    });
  }
}
