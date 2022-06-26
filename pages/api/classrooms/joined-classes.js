import executeQuery from "../../../config/db";
export default async (req, res) => {
  try {
    console.log("req nom", req.body);
    const result = await executeQuery({
      query: "SELECT * FROM Users WHERE reg_no='" + req.body.roll + "' ",
    });
    const arr = JSON.parse(result[0].class_id);
    console.log(arr[1].class_code);
    console.log("ttt", result);
    const finalClasses = [];
    for (let i = 0; i < arr.length; i++) {
      const classes = await executeQuery({
        query:
          "SELECT c_id FROM courses INNER JOIN controller2 WHERE courses.c_id=controller2.id AND courses.c_id='" +
          arr[i].class_code +
          "' AND controller2.s_order='" +
          req.body.order +
          "' AND controller2.s_year='" +
          req.body.year +
          "'",
      });
      finalClasses.push(classes);
    }
    console.log(finalClasses);
    res.send(finalClasses);
  } catch (error) {
    console.log(error);
  }
};
