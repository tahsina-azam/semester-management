import executeQuery from "../../../config/db";

export default async (req, res) => {
  try {
    console.log(req.body);
    let today = new Date();
    let dd = String(today.getDate()).padStart(2, "0");
    let mm = String(today.getMonth() + 1).padStart(2, "0"); //January is 0!
    let yyyy = today.getFullYear();
    let todayString = mm + "/" + dd + "/" + yyyy;
    var sql =
      "INSERT INTO comment (body,role,time,date,type,id, name) VALUES('" +
      req.body.body +
      "','" +
      req.body.role +
      "','" +
      new Date().toLocaleTimeString() +
      "','" +
      todayString +
      "','" +
      req.body.type +
      "','" +
      req.body.id +
      "','" +
      req.body.name +
      "')";
    const response = await executeQuery({ query: sql, values: [] });
    console.log({ response });
    if (response)
      res.send({
        status: "success",
        message: "successfully posted the comment",
      });
    else
      res.send({
        status: "fail",
        message: "couldn't upload your comment",
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
