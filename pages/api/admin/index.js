import executeQuery from "../../../config/db";
export default async (_, res) => {
  try {
    const result = await executeQuery({
      query: "SELECT * FROM Teachers WHERE status='pending'",
    });
    console.log("ttt", result);
    return res.send(result);
  } catch (error) {
    console.log(error);
  }
};
