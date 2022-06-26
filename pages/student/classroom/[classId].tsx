import { useRouter } from "next/router";
import React from "react";

function classId() {
  const router = useRouter();
  const { classId } = router.query;
  return <div>{classId}</div>;
}

export default classId;
