import axios from "axios";
import { useEffect, useState } from "react";
import useSWR from "swr";
import { useAuth } from "../../lib/client/context/auth";
import AppShellWithRole from "../../src/components/common/Bars";

const fetchCourse = async (id: string) => {
  const response = await axios.post("/api/student/joined-classes", { id });
  console.log({ response });
  return response.data.status === "success" ? response.data.result : [];
};

export default function Student() {
  const { user } = useAuth();
  const { data, error } = useSWR("courses", () => fetchCourse(user.id));
  console.log({ data, error });
  return (
    <AppShellWithRole user={user}>
      <div></div>
    </AppShellWithRole>
  );
}
