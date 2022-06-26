import axios from "axios";
import { Router } from "next/router";
import React from "react";

function ThreeOne() {
  let data = {
    roll: "2018331072",
    year: "3",
    order: "1",
  };
  axios
    .post("/api/classrooms/joined-classes", data)
    .then((response) => {
      console.log(response);
    })
    .catch((e) => {
      console.log(e);
    });

  return <div>ThreeOne</div>;
}

export default ThreeOne;
