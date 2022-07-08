import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import axios from "axios";
import AppShellWithRole from "../../../src/components/common/Bars";
import { useAuth } from "../../../lib/client/context/auth";
import Classroom from "../../../src/components/classroom";
import useSWR from "swr";

export default function ClassId() {
  const { user } = useAuth();
  const router = useRouter();
  const { classId } = router.query;
  if (!classId) return null;
  const {data,error} = useSWR(`courses/${classId}`)
  return (
    classId && (
      <AppShellWithRole
        user={user}
        extraType="classroom"
        id={classId.toString()}
      >
        {data && <Classroom classInfo={data} />}
      </AppShellWithRole>
    )
  );
}
