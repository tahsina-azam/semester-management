import executeQuery from "../../../config/db";

export default async (req, res) => {
  try {
    console.log(req.body.id);
    var sql = "SELECT * FROM comment WHERE id='" + req.body.id + "' AND type='"+req.body.type+"'";
    console.log({sql})
    const response = await executeQuery({ query: sql, values: [] });
    console.log({ response });
    if (response[0])
      res.send({
        status: "success",
        message: "successfully fetched comments",
        comments: response,
      });
    else
      res.send({
        status: "fail",
        message: "couldn't fetch your comments",
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
