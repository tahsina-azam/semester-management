import { useRouter } from "next/router";
import React, { useState } from "react";
import AppShellWithRole from "../../src/components/common/Bars";
import { useAuth } from "../../lib/client/context/auth";
import Classroom from "../../src/components/classroom";
import useSWR from "swr";
import { ParsedUrlQuery, StringifyOptions } from "querystring";
import { Tabs } from "@mantine/core";
import {
  IconPhoto,
  IconMessageCircle,
  IconSettings,
  IconCertificate,
  IconCoin,
  IconTruck,
} from "@tabler/icons";
import FeaturesAsymmetrical from "./post-task";

export default function ClassView({
  classId,
  posts,
  tasks
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
    score: number
  }[];
}) {
  const { user } = useAuth();
  const { data, error } = useSWR(`courses/${classId}`);
  const [activeTab, setActiveTab] = useState<string | null>("first");
  if (error) return null;
  console.log({posts})
  return (
    <AppShellWithRole user={user} extraType="classroom" id={classId}>
      <Tabs value={activeTab} onTabChange={setActiveTab}>
        <Tabs.List>
          <Tabs.Tab value="first">Posts</Tabs.Tab>
          <Tabs.Tab value="second">Tasks</Tabs.Tab>
        </Tabs.List>
        <Tabs.Panel value="first">
          <FeaturesAsymmetrical data={posts} />
        </Tabs.Panel>
        <Tabs.Panel value="second"> <FeaturesAsymmetrical data={tasks} /></Tabs.Panel>
      </Tabs>
      {data && <Classroom classInfo={data} />}
    </AppShellWithRole>
  );
}
