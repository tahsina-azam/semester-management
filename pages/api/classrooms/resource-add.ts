import { SetValues } from "@mantine/form/lib/types";
import executeQuery from "../../../config/db";
import {
  insertResourceOne,
  insertTaskCompletionOne,
} from "../../../lib/client/query";

export default async function (
  req: {
    body: {
      data: {
        type: string;
        link: string;
        title: string;
        description: string;
        uploader_type: string;
        uploader_mail: string;
        c_id: string;
        user: string;
        task: string;
      };
    };
  },
  res: any
) {
  const { data } = req.body;
  const query =
    data.type === "task-upload"
      ? insertTaskCompletionOne(data)
      : insertResourceOne(data);

  try {
    const response: any = await executeQuery(query);
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
