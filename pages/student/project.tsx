import { Center } from "@mantine/core";
import { useState } from "react";
import notify from "../../src/components/common/Notifications";
import UseRte from "../../src/components/common/rte-related";

export default function name() {
  const [visible, setVisible] = useState(false);
  const onSubmit = async (value) => {
    const titleForNotify = "Wohoo!";
    const text = "Succesfully submitted!";
    notify({ type: "success", title: titleForNotify, text });
  };
  return (
    <UseRte
      title
      titlePlaceholder="Title of the project"
      onSubmit={onSubmit}
      visible={visible}
    />
  );
}
