import executeQuery from "../../../config/db";
export default async (req, res) => {
  try {
    console.log("req nom", req.body);
    const result = await executeQuery({
      query:
        "INSERT INTO Users VALUES('" +
        req.body.roll +
        "','" +
        req.body.name +
        "',NULL,NULL,'" +
        req.body.email +
        "',NULL)",
    });
    console.log("ttt", result);
  } catch (error) {
    console.log(error);
  }
};
