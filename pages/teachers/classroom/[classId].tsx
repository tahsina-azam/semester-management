import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import axios from "axios";
import AppShellWithRole from "../../../src/components/common/Bars";
import { useAuth } from "../../../lib/client/context/auth";
import ClassView from "../../../src/components/view-classroom";
import useSWR from "swr";
import { Modal } from "@mantine/core";
import AddResource from "../../../src/components/common/add-resource";

const fetchCourse = async (url) => {
  const classId=url.split(" ")[1]
  console.log(classId)
  const response = await axios.get(`/api/student/view-classroom?classId=${classId}`);
  console.log({ response });
  const posts = response.data.status === "success" ? response.data.posts : [];
  const tasks = response.data.status === "success" ? response.data.tasks : [];
  return { posts, tasks };
};
export default function classId() {
  const router = useRouter();
  const {classId}=router.query;
  const [visible, setVisible] = useState(false)
  console.log({classId});
  
  const { data, error } = useSWR("post-task "+classId,
  fetchCourse
);
  if (!data) return null;
  console.log({ data, error });
  return (
    classId ?<>
    <Modal
        opened={visible}
        onClose={() => setVisible(false)}
        title="Add a file"
      >
        <AddResource c_id={classId} vis={setVisible} type="resource"/>
      </Modal>
    <ClassView posts={data.posts} tasks={data.tasks} vis={setVisible}/>
    </>:null
  );
  
}

