import executeQuery from "../../../config/db";
export default async (_, res) => {
  try {
    const result = await executeQuery({
      query: "SELECT * FROM teachers WHERE status='pending'",
      values: [],
    });
    console.log("ttt", result);
    return res.send(result);
  } catch (error) {
    console.log(error);
    return res.send(error);
  }
};
