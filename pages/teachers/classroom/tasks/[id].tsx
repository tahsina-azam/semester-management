import { Center } from "@mantine/core";
import axios from "axios";
import { useRouter } from "next/router";
import { useState } from "react";
import useSWR from "swr";
import { useAuth } from "../../../../lib/client/context/auth";
import notify from "../../../../src/components/common/Notifications";
import Banner from "../../../../src/components/common/post-task-full";
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
  const [visible, setVisible] = useState(false);
  const { data, error } = useSWR(`task/${id}`);
  const { data: datacom, error: errorcom } = useSWR(
    `teacher-comment ${id}`,getComment
  );
  console.log(id);
  if (!data) return null;
  if (!datacom) return null;
  
  
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
  const { id: tid, title, content, created_at, c_id, deadline, score } = data;
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
        onComment={onComment}
        comment={setVal}
        commentSet={datacom}
      />
    </Center>
  ) : null;
}
