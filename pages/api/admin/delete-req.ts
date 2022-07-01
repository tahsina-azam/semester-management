import executeQuery from "../../../config/db";
export default async (
  req: { body: { email: string } },
  res: {
    json: (arg0: {
      status: any;
      message?: string | any;
      errorMessage?: string | any;
      data?: object;
    }) => void;
  }
) => {
  try {
    console.log("req nom", req.body.email);
    const response: any = await executeQuery({
      query: "DELETE FROM teachers WHERE email='" + req.body.email + "'",
    });
    console.log({ response });
    if (response.affectedRows === 1)
      return res.json({
        status: "success",
        message: "successfully declined, please refresh the page",
      });
    return res.json({
      status: "fail",
      message: "No account found for the provided email",
    });
  } catch (error) {
    console.log(error);
    return res.json({
      status: "error",
      message: "something went wrong, please try again later",
      errorMessage: error,
    });
  }
};
