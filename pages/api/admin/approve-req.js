import executeQuery from "../../../config/db";
export default async (req, res) => {
  try {
    console.log("req nom", req.body);
    const result = await executeQuery({
      query:
        "UPDATE teachers SET status='approved' WHERE email='" +
        req.body.email +
        "'",
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
