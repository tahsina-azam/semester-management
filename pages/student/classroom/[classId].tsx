import { useRouter } from "next/router";
import React, { useState } from "react";
import axios from "axios";

function classId() {
  const router = useRouter();
  const { classId } = router.query;
  const [result, setResult] = useState([]);
  let inputList = [];
  let data = {
    code: classId,
  };
  axios
    .post("/api/student/view-classroom", data)
    .then((response) => {
      console.log(response.data.result);
    })
    .catch((e) => {
      console.log(e);
    });
  return <div>this is classroom</div>;
}

export default classId;
