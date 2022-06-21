import React from "react";
import "semantic-ui-css/semantic.min.css";
import { useRouter } from "next/router";
import { Menu, Divider, Text } from "@mantine/core";
import {
  Settings,
  Search,
  Photo,
  MessageCircle,
  Trash,
  ArrowsLeftRight,
} from "tabler-icons-react";
function Student() {
  //const currentPath = window.location.pathname;
  const router = useRouter();
  const currentPath = router.pathname;
  const newPath = currentPath + "/join-class";
  return (
    <Menu>
      <Menu.Label>Application</Menu.Label>
      <Menu.Item icon={<Settings size={14} />}>Settings</Menu.Item>
      <Menu.Item icon={<MessageCircle size={14} />}>Messages</Menu.Item>
      <Menu.Item icon={<Photo size={14} />}>Gallery</Menu.Item>
      <Menu.Item
        icon={<Search size={14} />}
        rightSection={
          <Text size="xs" color="dimmed">
            ⌘K
          </Text>
        }
      >
        Search
      </Menu.Item>

      <Divider />

      <Menu.Label>Danger zone</Menu.Label>
      <Menu.Item icon={<ArrowsLeftRight size={14} />}>
        Transfer my data
      </Menu.Item>
      <Menu.Item color="red" icon={<Trash size={14} />}>
        Delete my account
      </Menu.Item>
    </Menu>
  );
}

export default Student;
