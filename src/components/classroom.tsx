import { Drawer, Group, Text } from "@mantine/core";
import axios from "axios";
import { useEffect, useState } from "react";
import { Button } from "semantic-ui-react";
import { useAuth } from "../../lib/client/context/auth";
import  ComposedButton  from "./common/Button";

export default function Classroom({
  classInfo,
}: {
  classInfo: {
    c_id: string;
    c_code: string;
    c_credit: string;
    s_subject: string;
    c_title: string;
    c_date: string;
    t_id: string;
  };
}) {
  const { user } = useAuth();
  const { c_id, c_code, c_credit, s_subject, c_title, c_date, t_id } =
    classInfo;
  console.log({classInfo});
  const drawerInfo = [
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
      val: t_id,
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
  const [open, setOpen] = useState(false);

  useEffect(() => {
    async function fetchTeacher() {
      try {
        const response = await axios.post("/api", { id: t_id });
        if (response.data.status === "succcess")
          console.log(response.data.data);
      } catch (err) {
        console.log(err);
      }
    }
  }, []);
  return (
    <>
      <Group position="right">
        <ComposedButton text="Class info" onClick={() => setOpen(true)} />
        <Drawer
          opened={open}
          onClose={() => setOpen(false)}
          position="right"
          padding="sm"
          size="lg"
        >
          {drawerInfo.map((draw, index) => {
            return (
              <SetValForDrawer title={draw.title} val={draw.val} key={index} />
            );
          })}
        </Drawer>
      </Group>
    </>
  );
}
const SetValForDrawer = ({ title, val }) => {
  return (
    <Text p="lg">
      <span style={{ fontWeight: "bold" }}>{title} : </span>
      {val}
    </Text>
  );
};
