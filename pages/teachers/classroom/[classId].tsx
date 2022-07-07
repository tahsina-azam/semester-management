import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import axios from "axios";
import AppShellWithRole from "../../../src/components/common/Bars";
import { useAuth } from "../../../lib/client/context/auth";
import Classroom from "../../../src/components/classroom";

export default function ClassId() {
  const { user } = useAuth();
  const router = useRouter();
  const { classId } = router.query;
  const [info, setInfo] = useState(null);
  useEffect(() => {
    async function fetchClassInfo() {
      if (!classId) return;
      try {
        console.log({ classId });
        const response = await axios.post("/api/teachers/view-classroom", {
          classId,
        });
        if (response.data.status === "success") setInfo(response.data.data);
        console.log(response.data.data);
      } catch (err) {
        console.log(err);
      }
    }
    fetchClassInfo();
  }, []);
  if (!classId) return null;
  return (
    classId && (
      <AppShellWithRole
        user={user}
        extraType="classroom"
        id={classId.toString()}
      >
        {info && <Classroom classInfo={info} />}
      </AppShellWithRole>
    )
  );
}
