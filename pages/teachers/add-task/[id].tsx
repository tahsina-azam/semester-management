import AppShellWithRole from "../../../src/components/common/Bars";
import Rte from "../../../src/components/rte";
import { DatePicker, TimeInput } from "@mantine/dates";
import { useAuth } from "../../../lib/client/context/auth";
import { useState } from "react";
import { Center, Group, SimpleGrid } from "@mantine/core";
export default function CreateTask() {
  const { user } = useAuth();
  const [valueForDate, onChangeForDate] = useState(new Date());
  
  return (
    <Center
      style={{ flexDirection: "column", alignItems: "flex-start" }}
      p="xl"
      m="xl"
    >
      <SimpleGrid cols={2}>
        <DatePicker
          placeholder="Pick a date"
          label="Deadline"
          value={valueForDate}
          onChange={onChangeForDate}
          required
          p="sm"
        />
        <TimeInput required value={new Date()} label="Time" p="sm" />
      </SimpleGrid>

      <Rte />
    </Center>
  );
}
