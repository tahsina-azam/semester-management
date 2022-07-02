import { getAllStudents } from "../../lib/client/query";
import executeQuery from "../../config/db";
export default async (
  req: {},
  res: {
    json: (arg0: {
      status: string;
      data?: any;
      message?: any;
      errorMessage?: any;
    }) => any;
  }
) => {
  try {
    const query = getAllStudents();
    const response: any = await executeQuery(query);
    console.log({ response });
    const data: { id: number; value: string }[] = response.map(
      (res: { reg_no: number; name: string }) => {
        return { id: res.reg_no, value: res.name };
      }
    );
    if (response.length > 0)
      return res.json({
        status: " success",
        data: data,
      });
    return res.json({
      status: "fail",
      message: "no user found",
      data: data,
    });
  } catch (error) {
    console.log(error);
    return res.json({
      status: "fail",
      errorMessage: error,
    });
  }
};
