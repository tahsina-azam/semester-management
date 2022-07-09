import Rte from "../../../src/components/rte";
import { DatePicker, TimeInput } from "@mantine/dates";
import { useAuth } from "../../../lib/client/context/auth";
import {
  Center,
  Group,
  NumberInput,
  SimpleGrid,
  TextInput,
  Grid,
  LoadingOverlay,
} from "@mantine/core";
import { useForm } from "@mantine/form";
import { TypeButton } from "../../../src/components/common/Button";
import { Calendar, Clock, PencilMinus, Numbers } from "tabler-icons-react";
import axios from "axios";
import { useState } from "react";
import notify from "../../../src/components/common/Notifications";
export default function CreateTask() {
  const { user } = useAuth();
  const [visible, setVisible] = useState(false);
  const form = useForm({
    initialValues: {
      rte: "",
      title: "",
      score: 0,
      date: new Date(),
      time: new Date(),
    },
    validate: {
      date: (value) =>
        value >= new Date() ? null : "please enter a valid date",
      title: (value) => (value === "" ? "Please provide a title" : null),
      score: (value) => (value === 0 ? "please provide a proper value" : null),
    },
  });
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
      } = await axios.post("/api/teachers/create-task", {
        data: {
          rte,
          title,
          score,
          timeStampDate: timeStampDate,
          c_id: user.id,
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
    <Center
      style={{
        flexDirection: "column",
        alignItems: "flex-start",
        width: "100%",
      }}
      p="xl"
      m="xl"
    >
      <LoadingOverlay visible={visible} />
      <form
        onSubmit={form.onSubmit((values) => onSubmit(values))}
        style={{ width: "100%" }}
      >
        <SimpleGrid cols={3} style={{ width: "70%" }}>
          <DatePicker
            placeholder="Pick a date"
            label="Deadline"
            px="sm"
            dropdownType="modal"
            icon={<Calendar size={16} />}
            {...form.getInputProps("date")}
          />
          <TimeInput
            value={new Date()}
            label="Time"
            px="sm"
            icon={<Clock size={16} />}
            {...form.getInputProps("time")}
          />
        </SimpleGrid>
        <Grid style={{ width: "70%" }} p="sm">
          <Grid.Col span={6} px="sm">
            <TextInput
              label="Title"
              placeholder="Title of the task"
              icon={<PencilMinus size={16} />}
              {...form.getInputProps("title")}
            />
          </Grid.Col>
          <Grid.Col span={3} px="sm">
            <NumberInput
              label="Score"
              {...form.getInputProps("score")}
              icon={<Numbers size={16} />}
            />
          </Grid.Col>
        </Grid>

        <Rte {...form.getInputProps("rte")} />
        <TypeButton />
      </form>
    </Center>
  );
}
