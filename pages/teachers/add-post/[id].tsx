import { useAuth } from "../../../lib/client/context/auth";
import axios from "axios";
import { useState } from "react";
import notify from "../../../src/components/common/Notifications";
import RteForm from "../../../src/components/rte-form";
export default function () {
  const [visible, setVisible] = useState(false);
  const { user } = useAuth();
  const onSubmit = async (values) => {
    const { rte, title } = values;
    console.log({ values });
    setVisible(true);
    try {
      const response: {
        data: { status: string; message?: string; errorMessage?: string };
      } = await axios.post("/api/teachers/add", {
        data: {
          type: "post",
          rte,
          title,
          c_id: user.id,
        },
      });
      setVisible(false);
      console.log({response})
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
      return;
    } catch (err) {
      console.log(err);
      notify({
        type: "fail",
        title: "An error occured!",
        text: err.toString(),
      });
      return;
    }
  };
  return <RteForm type="post" onSubmit={onSubmit} visible={visible} />;
}
