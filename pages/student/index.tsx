import { SimpleGrid } from "@mantine/core";
import axios from "axios";
import { Key, useEffect, useState } from "react";
import useSWR, { mutate } from "swr";
import { useAuth } from "../../lib/client/context/auth";
import Class from "../../src/components/card/class-card";
import AppShellWithRole from "../../src/components/common/Bars";

const fetchCourse = async (id: string) => {
  const response = await axios.post("/api/student/joined-classes", { id });
  console.log({ response });
  return response.data.status === "success" ? response.data.data : [];
};

export default function Student() {
  const { user } = useAuth();
  const { data, error } = useSWR("courses", () => fetchCourse(user.id));
  console.log({ data, error });
  return (
    <AppShellWithRole user={user}>
      <SimpleGrid cols={3}>
        {data &&
          data.map(
            (
              val: {
                c_id: string;
                c_code: string;
                c_credit: string;
                s_subject: string;
                c_title: string;
                c_date: string;
                t_id: string;
              },
              index: Key
            ) => {
              console.log(index);
              mutate(`courses/${val.c_id}`, val);
              return <Class courseInfo={val} key={index} />;
            }
          )}
      </SimpleGrid>
    </AppShellWithRole>
  );
}
