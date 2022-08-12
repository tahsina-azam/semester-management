import { Center } from "@mantine/core";
import axios from "axios";
import { useRouter } from "next/router";
import { useState } from "react";
import useSWR from "swr";
import { useAuth } from "../../../../lib/client/context/auth";
import notify from "../../../../src/components/common/Notifications";
import Banner from "../../../../src/components/common/post-task-full";
const getComment = async (url) => {
  const id = url.split(" ")[1];
  console.log(id);
  const response = await axios.put("/api/posts/fetch-comment", {
    id: id,
    type: "post",
  });
  console.log({ response });
  return response.data.comments ? response.data.comments : [];
};
export default function Post() {
  const router = useRouter();
  const { id } = router.query;
  const { user } = useAuth();
  const [val, setVal] = useState("");
  console.log(id);
  const { data, error } = useSWR(`post/${id}`);
  const { data: datacomment, error: errorcomment } = useSWR(
    `teacher-post-comment ${id}`,
    getComment
  );
  if (!data) return null;
  console.log({ data, error });
  if(!datacomment)return null;
  const { id: pid, title, content, created_at, c_id } = data;
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
        type: "post",
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
        id={pid}
        title={title}
        content={content}
        created_at={created_at}
        c_id={c_id}
        onComment={onComment}
        comment={setVal}
        commentSet={datacomment}
      />
    </Center>
  ) : null;
}
