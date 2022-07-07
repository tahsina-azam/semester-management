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
    async function fetchClassInfo() {
      try {
        const response = await axios.post("/api/teachers/view-classroom", {
          classId,
        });
        console.log({ response });
      } catch (err) {
        console.log(err);
      }
    }
    fetchClassInfo();
  }, []);
  return (
    <AppShellWithRole user={user} extraType="classroom">
      <></>
    </AppShellWithRole>
  );
}
