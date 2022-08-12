import { Button, Center, Modal } from "@mantine/core";
import axios from "axios";
import { useRouter } from "next/router";
import { useState } from "react";
import useSWR from "swr";
import { useAuth } from "../../../../lib/client/context/auth";
import notify from "../../../../src/components/common/Notifications";
import Banner from "../../../../src/components/common/post-task-full";
import UseRte from "../../../../src/components/common/rte-related";
const getComment = async (url) => {
  const task_id = url.split(" ")[1];
  console.log({ task_id });
  const response: any = await axios.put("/api/posts/fetch-comment", {
    id: task_id,
    type: "task",
  });
  console.log(response.data.comments ? response.data.comments : []);
  return response.data.comments ? response.data.comments : [];
};
export default function Post() {
  const router = useRouter();
  const { id } = router.query;
  const {user} = useAuth()
  const [val, setVal] = useState("");
  const [del, setDel] = useState(false);
  const [ed, setEd] = useState(false);
  const { data, error } = useSWR(`task/${id}`);
  const [visibleLoading, setVisibleLoading] = useState(false);
  const { id: tid, title, content, created_at, c_id, deadline, score } = data;
  const { data: datacom, error: errorcom } = useSWR(
    `teacher-comment ${id}`,getComment
  );
  console.log(id);
  if (!data) return null;
  if (!datacom) return null;
  
  const onDelete = async () => {
    try {
      const response = await axios.post(
        "/api/post-task-resource/update-delete",
        {
          type: "delete",
          table: "tasks",
          id,
        }
      );
      console.log(response);
      const {
        data: { status },
      } = response;
      const titleForNotify = status === "success" ? "Wohoo!" : "Oops!";
      const text =
        status === "success"
          ? "Task deleted!"
          : response.data.errorMessage
          ? response.data.errorMessage
          : response.data.message;
      notify({ type: status, title: titleForNotify, text });
      console.log({ response });
      setDel(false);
    } catch (err) {}
  };
  const onEdit = async (values) => {
    const { rte, title, score } = values;
    setVisibleLoading(true)
    try {
      const response = await axios.post(
        "/api/post-task-resource/update-delete",
        {
          type: "update",
          table: "tasks",
          id,
          content: rte,
          title,
          deadline,
          score
        }
      );
      console.log(response);
      const {
        data: { status },
      } = response;
      const titleForNotify = status === "success" ? "Wohoo!" : "Oops!";
      const text =
        status === "success"
          ? "Succesfully Edited!"
          : response.data.errorMessage
          ? response.data.errorMessage
          : response.data.message;
          setVisibleLoading(false)
      notify({ type: status, title: titleForNotify, text });
      console.log({ response });
      
    } catch (err) {}
  };
  const onComment = async () => {
    console.log({ val });
    if (val === "") {
      notify({
        type: "fail",
        title: "Oops!",
        text: "Please type something",
      });
      return;
    }
    try {
      const response = await axios.post("/api/posts/insert-comment", {
        body: val,
        id,
        role: user.role,
        type: "task",
        name: user.name,
      });
      console.log({ response });
      const {
        data: { status },
      } = response;
      const titleForNotify = status === "success" ? "Wohoo!" : "Oops!";
      const text =
        status === "success"
          ? "Comment added!"
          : response.data.errorMessage
          ? response.data.errorMessage
          : response.data.message;
      notify({ type: status, title: titleForNotify, text });
      console.log({ response });
    } catch (err) {}
  };
  console.log({ data, error });
  
  return id ? (
    <Center>
      <Banner
        id={tid}
        title={title}
        content={content}
        created_at={created_at}
        c_id={c_id}
        score={score}
        deadline={deadline}
        onComment={onComment}
        comment={setVal}
        commentSet={datacom}
        setDel={setDel}
        setEd={setEd}
      />
      {/* ---------------delete modal */}
      <Modal
        opened={del}
        onClose={() => setDel(false)}
        title="Are you sure to delete?"
      >
        <Button
          m={"sm"}
          sx={(theme) => ({
            fontFamily: theme.fontFamilyMonospace,
            backgroundColor: theme.colors.green[5],
          })}
          onClick={() => setDel(false)}
        >
          No
        </Button>
        <Button
          m={"sm"}
          sx={(theme) => ({
            fontFamily: theme.fontFamilyMonospace,
            backgroundColor: theme.colors.red[5],
          })}
          onClick={onDelete}
        >
          Yes
        </Button>
      </Modal>
      {/* -------------edit modal */}
      <Modal opened={ed} onClose={() => setEd(false)} size="xl">
        <UseRte
          title
          score
          titlePlaceholder="Title of the post"
          onSubmit={onEdit}
          visible={visibleLoading}
          valuesForEdit={{ title, content, score }}
        />
      </Modal>
    </Center>
  ) : null;
}
