import { useState } from "react";
import UseRte from "../../../src/components/rte-related";

const onSubmit = async () => {};
export default function () {
  const [visible, setVisible] = useState(false);
  return <UseRte visible={visible} onSubmit={onSubmit} />;
}
