import executeQuery from "../../../config/db";

export default async (req, res) => {
  try {
    console.log(req.body);

    const query = "SELECT * FROM courses WHERE t_id='" + req.body.id + "'";
    const response = await executeQuery({ query });
    console.log({ response });
    if (response[0])
      res.send({
        status: "success",
        data: response,
      });
    else
      res.send({
        status: "fail",
        message: "couldn't find",
      });
  } catch (err) {
    console.log(err);
    res.status(400).send({
      status: "fail",
      message: "try again",
      errorMessage: err,
    });
  }
};
