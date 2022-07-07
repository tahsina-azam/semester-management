import AppShellWithRole from "../../../src/components/common/Bars";
import Rte from "../../../src/components/rte";
import { DatePicker } from "@mantine/dates";
import { useAuth } from "../../../lib/client/context/auth";
import { useState } from "react";
import { Center, Group } from "@mantine/core";
export default function CreateTask() {
  const { user } = useAuth();
  const [value, setValue] = useState(null);
  return (
    <Center
      style={{ flexDirection: "column", alignItems: "flex-start" }}
      p="xl"
      m="xl"
    >
      <DatePicker
        placeholder="Pick date"
        label="Deadline"
        required
        style={{ width: "20%" }}
        p="xl"
      />
      <Rte />
    </Center>
  );
}
