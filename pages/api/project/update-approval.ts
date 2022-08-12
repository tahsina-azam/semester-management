import executeQuery from "../../../config/db";
export default async (req, res) => {
  try {
    console.log("req nom", req.body);
    const result = await executeQuery({
      query:
        "UPDATE project SET approval=req.body.approval WHERE sender='" +
        req.body.email +
        "' AND c_id='" +
        req.body.c_id +
        "'",
      values: [],
    });
    console.log("ttt", result);
    return res.send({
      status: "success",
      message: "successfully approved, please refresh the page",
    });
  } catch (error) {
    console.log(error);
    return res.send({
      status: "error",
      message: "something went wrong, please try again later",
    });
  }
};
