import executeQuery from "../../../config/db";
export default async (res) => {
  try {
    const result = await executeQuery({
      query: "SELECT reg_no,name FROM users ",
    });
    console.log("ttt", result);
    return res.send({
      result: result,
    });
  } catch (error) {
    console.log(error);
  }
};
