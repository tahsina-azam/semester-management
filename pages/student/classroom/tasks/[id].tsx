import { Center, Modal } from "@mantine/core";
import { useRouter } from "next/router";
import useSWR from "swr";
import { useEffect, useState } from "react";
import AddResource from "../../../../src/components/common/add-resource";
import Banner from "../../../../src/components/post-task-full";
import axios from "axios";
import { useAuth } from "../../../../lib/client/context/auth";
export default function Post() {
  const router = useRouter();
  const { user } = useAuth();
  const [getStat, setGetStat] = useState(0);
  const { id } = router.query;
  const [visible, setVisible] = useState(false);
  console.log(id);
  const { data, error } = useSWR(`task/${id}`);
  if (!data) return null;
  console.log({ data, error });
  const { id: tid, title, content, created_at, c_id, deadline, score } = data;
  useEffect(() => {
    console.log(user.id);
    const getStat = async function () {
      const response = await axios.get(
        `/api/classrooms/get-status?user_id=${user.id}+id=${tid}`
      );
      console.log(response.data)
      if (response.data.status === 1) setGetStat(1);
    };
    getStat();
  }, []);
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
        stat = {getStat}
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
