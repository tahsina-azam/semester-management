import { useAuth } from "../../lib/client/context/auth";
import axios from "axios";
import { useState } from "react";
import notify from "./common/Notifications";
import UseRte from "./common/rte-related";
export default function RteForm({
  type,
  dateb = false,
  timeb = false,
  scoreb = false,
  onSubmit,
  visible
}: {
  type: string;
  dateb?: boolean;
  timeb?: boolean;
  scoreb?: boolean;
  onSubmit: (values: any) => Promise<void>;
  visible: boolean
}) {

  
  return (
    <UseRte
      {...(dateb && { date: true })}
      {...(timeb && { time: true })}
      title
      {...(scoreb && { score: true })}
      visible={visible}
      onSubmit={onSubmit}
      titlePlaceholder={"Title of the "+ type}
    />
  );
}
