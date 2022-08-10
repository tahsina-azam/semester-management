import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import axios from "axios";
import AppShellWithRole from "../../../src/components/common/Bars";
import { useAuth } from "../../../lib/client/context/auth";

export default function classId() {
  const { user } = useAuth();
  const router = useRouter();
  const { classId } = router.query;

  useEffect(() => {
    console.log(classId);
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
}
