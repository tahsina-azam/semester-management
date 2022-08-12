import axios from "axios";
import { Key, useEffect, useState } from "react";
import { useAuth } from "../../lib/client/context/auth";
import AppShellWithRole from "../../src/components/common/Bars";
import Class from "../../src/components/card/class-card";
import { Modal, SimpleGrid, Button } from "@mantine/core";
import useSWR, { useSWRConfig } from "swr";
import notify from "../../src/components/common/Notifications";

const fetchCourse = async (id: string) => {
  const response = await axios.post("/api/teachers/view-all-courses", { id });
  console.log({ response });
  return response.data.status === "success" ? response.data.data : [];
};
export default function Teacher() {
  const { mutate } = useSWRConfig();
  const { user } = useAuth();
  const [open, setopen] = useState(false);
  const [cid, set_cid] = useState("");
  const { data, error } = useSWR("courses", () => fetchCourse(user.id));
  console.log({ data, error });
  const onDelete = async () => {
    try {
      const response = await axios.post("/api/teachers/delete-course", {
        id: cid,
      });
      const {
        data: { status },
      } = response;
      setopen(false);
      console.log({response})
      location.reload()
      // const titleForNotify = status === "success" ? "Wohoo!" : "Oops!";
      // const text =
      //   status === "success"
      //     ? "Course deleted!"
      //     : response.data.errorMessage
      //     ? response.data.errorMessage
      //     : response.data.message;
      // notify({ type: status, title: titleForNotify, text });
      // console.log({ response });
     
    } catch (err) {}
  };
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
                name: string;
              },
              index: Key
            ) => {
              console.log(index);
              mutate(`courses/${val.c_id}`, val);
              return (
                <Class
                  courseInfo={val}
                  key={index}
                  setOpen={setopen}
                  set_cid={set_cid}
                />
              );
            }
          )}
      </SimpleGrid>
      <Modal opened={open} onClose={() => setopen(false)} title="Are you sure?">
        <Button color="red" m={"sm"} onClick={onDelete}>
          Yes
        </Button>
        <Button color="green" m="sm" onClick={() => setopen(false)}>
          No
        </Button>
      </Modal>
    </AppShellWithRole>
  );
}
