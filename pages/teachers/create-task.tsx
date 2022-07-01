import AppShellWithRole from "../../src/components/common/Bars";
import Rte from "../../src/components/rte";
import { DatePicker } from "@mantine/dates";
import { useAuth } from "../../lib/client/context/auth";
import { useState } from "react";
import { Group } from "@mantine/core";
export default function CreateTask() {
  const { user } = useAuth();
  const [value, setValue] = useState(null);
  return (
    <AppShellWithRole user={user}>
      <Group position="left" m={"lg"}>
        <DatePicker
          placeholder="Pick date"
          label="Deadline"
          required
          style={{ width: "20%" }}
        />
      </Group>
      <Group position="left" m={"lg"}>
        <Rte />
      </Group>
    </AppShellWithRole>
  );
}
