import { SimpleGrid, Text } from "@mantine/core";
import axios from "axios";
import { Key, useEffect, useState } from "react";
import useSWR, { mutate } from "swr";
import { useAuth } from "../../lib/client/context/auth";
import Class from "../../src/components/card/class-card";
import AppShellWithRole from "../../src/components/common/Bars";

const fetchCourse = async (id: string) => {
  const response = await axios.post("/api/student/joined-classes", { id });
  console.log({ response });
  console.log(response.data.other_courses);
  const data = response.data.status === "success" ? response.data.data : [];
  const other_courses =
    response.data.status === "success" ? response.data.other_courses : [];
    return {data, other_courses}
};

export default function Student() {
  const { user } = useAuth();
  const { data, error } = useSWR("courses", () => fetchCourse(user.id));
  console.log({ data, error });
  return (
    <AppShellWithRole user={user}>
      <SimpleGrid cols={3}>
        {data && data.data &&
          data.data.map(
            (
              val: {
                c_id: string;
                c_code: string;
                c_credit: string;
                s_subject: string;
                c_title: string;
                c_date: string;
                t_id: string;
                name: string
              },
              index: Key
            ) => {
              console.log(index);
              mutate(`courses/${val.c_id}`, val);
              return <Class courseInfo={val} key={index} />;
            }
          )}
      </SimpleGrid>
      <Text size={"lg"} mt="xl">You've following available courses in this semester. Please get the code from the teacher to join.</Text>
      <SimpleGrid cols={3} mt="lg">
        {data && data.other_courses &&
          data.other_courses.map(
            (
              val: {
                c_id: string;
                c_code: string;
                c_credit: string;
                s_subject: string;
                c_title: string;
                c_date: string;
                t_id: string;
                name: string
              },
              index: Key
            ) => {
              console.log(index);
              return <Class courseInfo={val} key={index} type="unjoined"/>;
            }
          )}
      </SimpleGrid>
    </AppShellWithRole>
  );
}
