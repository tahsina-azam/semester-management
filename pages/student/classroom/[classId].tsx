import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import axios from "axios";
import AppShellWithRole from "../../../src/components/common/Bars";
import { useAuth } from "../../../lib/client/context/auth";
import ClassView from "../../../src/components/view-classroom";
import useSWR from "swr";
import { Modal } from "@mantine/core";
import AddResource from "../../../src/components/common/add-resource";
import { User } from "../../../lib/common/types";

const fetchCourse = async (url: string, user: User) => {
  const classId = url.split(" ")[1];
  const response = await axios.put(`/api/student/view-classroom`, {
    classId,
    type: user.role,
    email: user.email,
  });
  const posts = response.data.status === "success" ? response.data.posts : [];
  const tasks = response.data.status === "success" ? response.data.tasks : [];
  const resources =
    response.data.status === "success" ? response.data.resources : [];
  return { posts, tasks, resources };
};
export default function Task() {
  const router = useRouter();
  const { user } = useAuth();
  const { classId } = router.query;
  const [visible, setVisible] = useState(false);
  const [posts, setPosts] = useState([]);
  const [tasks, setTasks] = useState([]);
  const [resources, setResources] = useState([]);

  console.log(classId);

  const { data, error } = useSWR("post-task " + classId, (url) =>
    fetchCourse(url, user),{
      onSuccess: (data, key, config) => {
        setPosts(data.posts);
        setTasks(data.tasks);
        setResources(data.resources);
      },
      onError: (error, x, y) => {
        console.log({ error });
        setPosts([]);
        setTasks([]);
        setResources([]);
      },
    }
  );
  if (!data) return null;
  console.log({ data, error });
  return classId ? (
    <>
      <Modal
        opened={visible}
        onClose={() => setVisible(false)}
        title="Add a file"
      >
        <AddResource c_id={classId} vis={setVisible} type="resource" />
      </Modal>
      <ClassView
        posts={posts}
        tasks={tasks}
        resources={resources}
        vis={setVisible}
        setPosts={setPosts}
        setTasks={setTasks}
        setResources={setResources}
      />
    </>
  ) : null;
}
