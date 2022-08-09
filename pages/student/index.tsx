import axios from "axios";
import { useEffect, useState } from "react";
import { useAuth } from "../../lib/client/context/auth";
import AppShellWithRole from "../../src/components/common/Bars";

export default function Student() {
  const { user } = useAuth();
  const [courses, setCourses] = useState([]);
  useEffect(() => {
    const data = user.id
    const fetch = async function () {
      const response = await axios.put("/api/student/joined-classes", {data});
      const arr = response.data;
      setCourses(arr);
      console.log({ courses });
    };
    fetch();
  }, []);

  return (
    <AppShellWithRole user={user}>
      <div></div>
    </AppShellWithRole>
  );
}
