import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import axios from "axios";
import AppShellWithRole from "../../../src/components/common/Bars";
import { useAuth } from "../../../lib/client/context/auth";
import ClassView from "../../../src/components/view-classroom";
import useSWR from "swr";

const fetchCourse = async (classId) => {
  const data1 = {
    code: classId,
  };
  const response = await axios.post("/api/student/view-classroom", data1);
  console.log({ response });
  return response.data.status === "success" ? response.data.data : [];
};
export default function classId() {
  const { user } = useAuth();
  const router = useRouter();
  const { classId } = router.query;
<<<<<<< HEAD

  useEffect(() => {
    console.log(classId);
    
    console.log(router.query);
    async function fetchClassInfo() {
      try {
        const data = {
          code: classId,
        };
        const response = await axios.post("/api/student/view-classroom", data);
        console.log({ response });
      } catch (err) {
        console.log(err);
      }
    }
    fetchClassInfo();
  }, [router.query]);
  return (
    <AppShellWithRole user={user} extraType="classroom">
      <></>
    </AppShellWithRole>
  );
=======
  const { data, error } = useSWR("courses", () => fetchCourse(classId));
  if (error) return null;
  if (!data) return null;
  return data && <ClassView data={data} id={user.id} user={user} />;
>>>>>>> 27a94e2 (partial fixed)
}
