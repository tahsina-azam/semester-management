import { Card, Center, Group, Text } from "@mantine/core";
import { X, Check, DoorEnter } from "tabler-icons-react";
import { useAuth } from "../../../lib/client/context/auth";
import { IconButton } from "../common/Button";
import StyleText from "./text-style";
import create from "zustand";
import useSWR from "swr";
import { useRouter } from "next/router";
export default function Class({
  courseInfo: { c_id, c_code, c_credit, s_subject, c_title, c_date, t_id },
}: {
  courseInfo: {
    c_id: string;
    c_code: string;
    c_credit: string;
    s_subject: string;
    c_title: string;
    c_date: string;
    t_id: string;
  };
}) {
  const router = useRouter();
  const { user } = useAuth();
  const { data, error } = useSWR(`courses/${c_id}`);
  const handleClick = () => {
    user.role === "teacher"
      ? router.push(`/teachers/classroom/${c_id}`)
      : router.push(`/student/classroom/${c_id}`);
  };
  const handleDelete = () => {};
  console.log({ data });
  const info = [
    {
      title: "Course Title ",
      val: c_title,
    },
    {
      title: "Course Code ",
      val: c_code,
    },
    {
      title: "Assigned Teacher ",
      val: user.role === "teacher" ? user.name : "",
    },
    {
      title: "Course Credit ",
      val: c_credit,
    },
    {
      title: "Course Created On ",
      val: c_date,
    },
  ];

  return (
    <Card
      sx={(theme) => ({
        borderStyle: "solid",
        borderWidth: "thin",
        borderColor: theme.colors.indigo[5],
      })}
    >
      <Card.Section
        sx={(theme) => ({
          color: "white",
          fontFamily: theme.fontFamily,
          backgroundColor: theme.colors.indigo[5],
          borderStyle: "solid",
          borderColor: theme.colors.indigo[5],
        })}
      >
        <Center style={{ flexDirection: "column" }}>
          <Text
            transform="capitalize"
            p="sm"
            style={{ fontWeight: "bold" }}
            size="lg"
          >
            {c_title}
          </Text>
        </Center>
      </Card.Section>
      <Group
        p="sm"
        position="left"
        style={{
          flexDirection: "column",
          justifyContent: "start",
          alignItems: "flex-start",
        }}
      >
        {info.map((inf, key) => (
          <StyleText text2={inf.title} text1={inf.val} key={key} />
        ))}
      </Group>
      <Group p="sm">
        <IconButton Icon={<X size={15} />} color="red" onClick={handleDelete} />
        <IconButton
          Icon={<DoorEnter size={15} />}
          color="blue"
          onClick={handleClick}
        />
      </Group>
    </Card>
  );
}
