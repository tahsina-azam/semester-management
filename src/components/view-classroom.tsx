import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import axios from "axios";
import AppShellWithRole from "./common/Bars";
import { useAuth } from "../../lib/client/context/auth";
import Classroom from "./classroom";
import useSWR from "swr";
import { User } from "../../lib/common/types";

export default function ClassView({
  data,
  id,
  user
}: {
  data: {
    c_id: string;
    c_code: string;
    c_credit: string;
    s_subject: string;
    c_title: string;
    c_date: string;
    t_id: string;
  };
  id: string;
  user : User
}) {
  return (
    <AppShellWithRole user={user} extraType="classroom" id={id}>
      <Classroom classInfo={data} />
    </AppShellWithRole>
  );
}
