import React, { Dispatch, SetStateAction, useState } from "react";
import AppShellWithRole from "../../src/components/common/Bars";
import { useAuth } from "../../lib/client/context/auth";
import Classroom from "../../src/components/classroom";
import useSWR from "swr";
import { Tabs } from "@mantine/core";
import FeaturesAsymmetrical from "./common/post-task";
import FeaturesAsymmetricalResource from "./common/show-resource";
import Searchbar from "./common/Searchbar";

export default function ClassView({
  classId,
  posts,
  tasks,
  vis,
  resources,
  setPosts,
  setTasks,
  setResources
}: {
  classId: string;
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
    name: string;
    link: string;
    description: string;
    uploader_mail: string;
    uploader_type: string;
    created_at: string;
    title: string
  }[];
  vis?: Dispatch<SetStateAction<boolean>>;
  setPosts: Dispatch<SetStateAction<any[]>>;
  setTasks: Dispatch<SetStateAction<any[]>>;
  setResources: Dispatch<SetStateAction<any[]>>

}) {
  const { user } = useAuth();
  console.log({classId})
  const { data, error } = useSWR(`courses/${classId}`);
  const [activeTab, setActiveTab] = useState<string | null>("first");
  if (error) return null;
  return (
    <AppShellWithRole user={user} extraType="nosidebar">
      
      <Tabs value={activeTab} onTabChange={setActiveTab}>
        <Tabs.List>
          <Tabs.Tab value="first">Posts</Tabs.Tab>
          <Tabs.Tab value="second">Tasks</Tabs.Tab>
          <Tabs.Tab value="third">Resource</Tabs.Tab>
        </Tabs.List>
        <Tabs.Panel value="first">
        <Searchbar items={posts} updateParent={setPosts} />
          <FeaturesAsymmetrical data={posts} type={"post"} c_id={classId} />
        </Tabs.Panel>
        <Tabs.Panel value="second">
        <Searchbar items={tasks} updateParent={setTasks} />
          <FeaturesAsymmetrical data={tasks} type={"task"} c_id={classId} />
          
        </Tabs.Panel>
        <Tabs.Panel value="third">
        <Searchbar items={resources} updateParent={setResources} />
          <FeaturesAsymmetricalResource
            data={resources}
            vis={vis}
            type={""}
          />
        </Tabs.Panel>
      </Tabs>
    </AppShellWithRole>
  );
}
