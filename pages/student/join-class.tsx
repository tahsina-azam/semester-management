import {
  Box,
  Button,
  Center,
  Group,
  TextInput,
  useMantineTheme,
} from "@mantine/core";
import { useForm } from "@mantine/form";
import { LockSquare } from "tabler-icons-react";
import AppShellWithRole from "../../src/components/common/Bars";
import { useAuth } from "../../lib/client/context/auth";
import axios from "axios";
import Router from "next/router";
import { TypeButton } from "../../src/components/common/Button";
import notify from "../../src/components/common/Notifications";
export default function JoinClass() {
  const theme = useMantineTheme();
  const { user } = useAuth();
  const form = useForm({
    initialValues: { code: "" },
    validate: {
      code: (value) => (value === null ? "Please fill out the field" : ""),
    },
  });
  const onsubmit = async (e: { preventDefault: () => void }) => {
    e.preventDefault();
    console.log("inside handle submit");
    const path = window.location.pathname;
    const arr = path.split("/");
    console.log();
    let data = {
      code: form.getInputProps("code").value,
      email: "tahsina.sheeva@gmail.com",
    };
    console.log(data);
    try {
      const response = await axios.post("/api/student/join-class", data);
      console.log(response);
      const {
        data: { status, message },
      } = response;
      console.log({response})
      if(status==="fail") return notify({
        type: "fail",
        title: "Oops!",
        text: "Please try again with a correct code.",
      });
        const {
          data: { link },
        } = response;
        notify({
          type: "success",
          title: "Found a class!",
          text: "Welcome to the course!",
        });
        return Router.push(link);
    } catch (err) {
      console.log(err);
      notify({
        type: "fail",
        title: "Sorry!",
        text: "Please try again with a correct code!",
      });
    }
  };
  return (
    <AppShellWithRole user={user}>
      <Center style={{ width: "100%", height: "70%" }}>
        <Box>
          <Group position="center" m="md">
            <LockSquare
              size={40}
              strokeWidth={1}
              color={theme.colors.indigo[9]}
            />
          </Group>

          <form onSubmit={onsubmit}>
            <TextInput
              size="lg"
              required
              {...form.getInputProps("code")}
              placeholder="Please enter the code"
            ></TextInput>
            <Group position="center" m="md">
              <TypeButton />
            </Group>
          </form>
        </Box>
      </Center>
    </AppShellWithRole>
  );
}
