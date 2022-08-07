import axios from "axios";
import { useAuth } from "../../lib/client/context/auth";
import AppShellWithRole from "../../src/components/common/Bars";

export default function Student() {
  const { user } = useAuth();
  let data = {
    id: user.id,
  };
  axios
    .post("/api/student/joined-classes", data)
    .then((response) => {
      console.log(response);
    })
    .catch((e) => {
      console.log(e);
    });
  return (
    <AppShellWithRole user={user}>
      <div></div>
    </AppShellWithRole>
  );
}
