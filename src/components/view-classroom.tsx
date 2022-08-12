import React, { Dispatch, SetStateAction, useState } from "react";
import AppShellWithRole from "../../src/components/common/Bars";
import { useAuth } from "../../lib/client/context/auth";
import Classroom from "../../src/components/classroom";
import useSWR from "swr";
import { Tabs } from "@mantine/core";
import FeaturesAsymmetrical from "./common/post-task";
import FeaturesAsymmetricalResource from "./common/show-resource";

export default function ClassView({
  classId,
  posts,
  tasks,
  vis,
  resources,
}: {
  classId?: string;
  posts: {
    id: string;
    content: string;
    title: string;
    created_at: any;
    c_id: string;
  }[];
  tasks: {
    id: string;
    content: string;
    title: string;
    created_at: any;
    c_id: string;
    deadline: string;
    score: number;
  }[];
  resources: {
    id: string;
    link: string;
    description: string;
    uploader_mail: string;
    uploader_type: string;
    created_at: string
  }[];
  vis?: Dispatch<SetStateAction<boolean>>;
}) {
  const { user } = useAuth();
  console.log({resources})
  const { data, error } = useSWR(`courses/${classId}`);
  const [activeTab, setActiveTab] = useState<string | null>("first");
  if (error) return null;
  return (
    <AppShellWithRole user={user} extraType="nosidebar" id={classId}>
      <Tabs value={activeTab} onTabChange={setActiveTab}>
        <Tabs.List>
          <Tabs.Tab value="first">Posts</Tabs.Tab>
          <Tabs.Tab value="second">Tasks</Tabs.Tab>
          <Tabs.Tab value="third">Resource</Tabs.Tab>
        </Tabs.List>
        <Tabs.Panel value="first">
          <FeaturesAsymmetrical data={posts} type={"post"} c_id={classId} />
        </Tabs.Panel>
        <Tabs.Panel value="second">
          <FeaturesAsymmetrical data={tasks} type={"task"} c_id={classId} />
        </Tabs.Panel>
        <Tabs.Panel value="third">
          <FeaturesAsymmetricalResource
            data={resources}
            vis={vis}
            c_id={classId}
          />
        </Tabs.Panel>
      </Tabs>
      {data && <Classroom classInfo={data} />}
    </AppShellWithRole>
  );
}
