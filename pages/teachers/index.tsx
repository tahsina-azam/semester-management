import axios from "axios";
import { useEffect } from "react";
import { useAuth } from "../../lib/client/context/auth";
import AppShellWithRole from "../../src/components/common/Bars";

export default function Student() {
  const { user } = useAuth();
  useEffect(() => {
    console.log(user.id); //id for teacher
    let data = {
      id: user.id,
    };
    axios
      .post("/api/teachers/view-all-courses", data)
      .then((response) => {
        console.log(response);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);
  return (
    <AppShellWithRole user={user}>
      <div>{user.id}</div>
    </AppShellWithRole>
  );
}
