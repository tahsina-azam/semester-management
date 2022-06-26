import axios from "axios";
import React from "react";
import { useAuth } from "../../lib/client/context/auth";
function profile() {
  const { user } = useAuth();
  let data = {
    email: user.email,
    role: user.role,
  };
  axios
    .post("/api/profile", data)
    .then((response) => {
      console.log(response.data.result);
    })
    .catch((e) => {
      console.log(e);
    });
  return <div>profile</div>;
}

export default profile;
