import executeQuery from "../../../config/db";
import { insertPostOne, insertResourceOne, insertTaskOne } from "../../../lib/client/query";

export default async function (
  req: {
    body: {
      data: {
        link: string;
        description: string;
        uploader_type: string;
        uploader_mail: string;
        c_id: string
      };
    };
  },
  res: any
) {
  const { data } = req.body;
  const query = insertResourceOne(data)
  console.log({ query });
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
