import Rte from "../../src/components/rte";
import { DatePicker, TimeInput } from "@mantine/dates";
import {
  Center,
  NumberInput,
  SimpleGrid,
  TextInput,
  Grid,
  LoadingOverlay,
} from "@mantine/core";
import { useForm } from "@mantine/form";
import { TypeButton } from "../../src/components/common/Button";
import { Calendar, Clock, PencilMinus, Numbers } from "tabler-icons-react";
export default function UseRte({
  date = false,
  time = false,
  title = false,
  score = false,
  titlePlaceholder,
  visible,
  onSubmit,
}: {
  date?: boolean;
  time?: boolean;
  title?: boolean;
  titlePlaceholder?: string;
  score?: boolean;
  visible: boolean;
  onSubmit: (value) => {};
}) {
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
          {date && (
            <DatePicker
              placeholder="Pick a date"
              label="Deadline"
              px="sm"
              dropdownType="modal"
              icon={<Calendar size={16} />}
              {...form.getInputProps("date")}
            />
          )}
          {time && (
            <TimeInput
              value={new Date()}
              label="Time"
              px="sm"
              icon={<Clock size={16} />}
              {...form.getInputProps("time")}
            />
          )}
        </SimpleGrid>
        <Grid style={{ width: "70%" }} p="sm">
          <Grid.Col span={6} px="sm">
            {title && (
              <TextInput
                label="Title"
                placeholder={titlePlaceholder}
                icon={<PencilMinus size={16} />}
                {...form.getInputProps("title")}
              />
            )}
          </Grid.Col>
          <Grid.Col span={3} px="sm">
            {score && (
              <NumberInput
                label="Score"
                {...form.getInputProps("score")}
                icon={<Numbers size={16} />}
              />
            )}
          </Grid.Col>
        </Grid>

        <Rte {...form.getInputProps("rte")} />
        <TypeButton />
      </form>
    </Center>
  );
}
