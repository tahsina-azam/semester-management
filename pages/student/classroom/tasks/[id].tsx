import {  Center, Modal } from "@mantine/core";
import { useRouter } from "next/router";
import useSWR from "swr";
import { useState } from "react";
import AddResource from "../../../../src/components/common/add-resource";
import Banner from "../../../../src/components/post-task-full";
export default function Post() {
  const router = useRouter();
  const { id } = router.query;
  const [visible, setVisible] = useState(false)
  console.log(id);
  const { data, error } = useSWR(`task/${id}`);
  if (!data) return null;
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
        vis = {setVisible}
      />
      <Modal
        opened={visible}
        onClose={() => setVisible(false)}
        title="Add a file"
      >
        <AddResource c_id={c_id} vis={setVisible} type="task-upload" taskid={tid}/>
      </Modal>
      

    </Center>
  ) : null;
}

