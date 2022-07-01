import axios from "axios";
import React from "react";

function query() {
  axios.get("/api/all-students").then((response) => {
    console.log(response);
  });
}

export default query;
