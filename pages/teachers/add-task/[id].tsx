import { useAuth } from "../../../lib/client/context/auth";
import axios from "axios";
import { useState } from "react";
import notify from "../../../src/components/common/Notifications";
import { useRouter } from "next/router";
import UseRte from "../../../src/components/common/rte-related";

export default function () {
  const [visible, setVisible] = useState(false);
  const router = useRouter();
  console.log(router.query);
  const onSubmit = async (values) => {
    const { rte, date, time, title, score } = values;
    console.log({ values });
    const assignedDate: Date = new Date(
      date.getFullYear(),
      date.getMonth(),
      date.getDate(),
      time.getHours(),
      time.getMinutes(),
      time.getSeconds()
    );
    console.log({ assignedDate });
    const timeStampDate: string = assignedDate.toUTCString();
    // console.log({timeStampDate})
    setVisible(true);
    try {
      const response: {
        data: { status: string; message?: string; errorMessage?: string };
      } = await axios.post("/api/teachers/add", {
        data: {
          rte,
          title,
          score,
          timeStampDate: timeStampDate,
          c_id: router.query.id,
        },
      });
      setVisible(false);
      const {
        data: { status },
      } = response;
      const titleForNotify = status === "success" ? "Wohoo!" : "Oops!";
      const text =
        status === "success"
          ? "Succesfully created a task!"
          : response.data.errorMessage
          ? response.data.errorMessage
          : response.data.message;
      notify({ type: status, title: titleForNotify, text });
      console.log({ response });
    } catch (err) {
      console.log(err);
      notify({
        type: "fail",
        title: "An error occured!",
        text: err.toString(),
      });
    }
  };
  return (
    <UseRte
      date
      time
      score
      title
      titlePlaceholder="Title of the task"
      onSubmit={onSubmit}
      visible={visible}
    />
  );
}
