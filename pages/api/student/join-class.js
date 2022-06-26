import executeQuery from "../../../config/db";
export default async (req, res) => {
  try {
    console.log("req nom", req.body);
    const result = await executeQuery({
      query: "SELECT * FROM Courses WHERE c_id='" + req.body.code + "'",
    });
    console.log("ttt", result);

    if (result.length > 0) {
      var feed = { class_code: req.body.code };
      var data = [];
      const student = await executeQuery({
        query: "SELECT * FROM Users WHERE email='" + req.body.email + "'",
      });
      // if (student[0].class_id === null) {
      //   data.push(feed);
      //   const obj = JSON.stringify(data);
      //   const first_code = await executeQuery({
      //     query:
      //       "UPDATE Users SET class_id='" +
      //       obj +
      //       "' WHERE reg_no='" +
      //       req.body.roll +
      //       "'",
      //   });
      //   console.log("firstPush:" + first_code);
      // } else {
      //   console.log(student[0].class_id);
      //   data = JSON.parse(student[0].class_id);
      //   console.log("temp:" + data);
      //   data.push(feed);
      //   const obj = JSON.stringify(data);
      //   //temp.append(req.body.code);
      //   const second_code = await executeQuery({
      //     //   query:
      //     //     " INSERT INTO Users (class_id) VALUES ({req.body.code}) WHERE reg_no='" +
      //     //     req.body.roll +
      //     //     "'",
      //     query:
      //       "UPDATE Users SET class_id='" +
      //       obj +
      //       "' WHERE reg_no='" +
      //       req.body.roll +
      //       "'",
      //   });
      //   console.log("secondPush:" + second_code);
      // }
      const result_semester = await executeQuery({
        query:
          "INSERT INTO controller3 VALUES('" +
          student[0].class_id +
          "','" +
          result[0].c_id +
          "')",
      });
      return res.send({
        result: result,
        link: "/student/classroom/" + req.body.code,
      });
    } else {
      return res.status(400).send({
        message: "Wrong Code",
      });
    }
  } catch (error) {
    console.log(error);
  }
};
