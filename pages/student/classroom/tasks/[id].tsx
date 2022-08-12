import { Center, Modal } from "@mantine/core";
import { useRouter } from "next/router";
import useSWR from "swr";
import { useEffect, useState } from "react";
import AddResource from "../../../../src/components/common/add-resource";
import Banner from "../../../../src/components/common/post-task-full";
import axios from "axios";
import { useAuth } from "../../../../lib/client/context/auth";
import notify from "../../../../src/components/common/Notifications";
const getAll = async (url, user) => {
  const task_id = url.split(" ")[1];
  const getComment = async () => {
    console.log({ task_id });
    const response: any = await axios.put("/api/posts/fetch-comment", {
      id: task_id,
      type: "task",
    });
    console.log(response.data.comments ? response.data.comments : []);
    return response.data.comments ? response.data.comments : [];
  };
  const getStat = async function () {
    console.log({ task_id });
    const response = await axios.put(`/api/classrooms/get-status`, {
      id: task_id,
      user_id: user.id,
    });
    console.log(response.data);
    return response.data.status === 1 ? 1 : 0;
  };
  const commentSet = await getComment();
  console.log({ commentSet });
  const stat = await getStat();
  return { commentSet, stat };
};

export default function Post() {
  const router = useRouter();
  const { user } = useAuth();
  const { id } = router.query;
  const [val, setVal] = useState("");
  const [visible, setVisible] = useState(false);

  const { data, error } = useSWR(`task/${id}`);
  if (!data) return null;
  const { data: datastatcom, error: errorstatcom } = useSWR(
    `stat-comment ${id}`,
    (url) => getAll(url, user)
  );
  if (!datastatcom) return null;

  console.log({ data, error });
  const { id: tid, title, content, created_at, c_id, deadline, score } = data;

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
        vis={setVisible}
        stat={datastatcom.stat}
        onComment={onComment}
        comment={setVal}
        commentSet={datastatcom.commentSet}
      />
      <Modal
        opened={visible}
        onClose={() => setVisible(false)}
        title="Add a file"
      >
        <AddResource
          c_id={c_id}
          vis={setVisible}
          type="task-upload"
          taskid={tid}
        />
      </Modal>
    </Center>
  ) : null;
}
