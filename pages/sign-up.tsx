import {
  TextInput,
  Group,
  PasswordInput,
  Card,
  Button,
  NumberInput,
} from "@mantine/core";
import { ComposedButton, Center } from "../src/components/common";
import { useForm } from "@mantine/form";
import { useAuth } from "../lib/client/context/auth";
import { fail } from "assert";
export default function Demo() {
  const { signUpAndVerifyEmail } = useAuth();
  const onsubmit = async (values: {
    name: string;
    email: string;
    password: string;
    "confirm password"?: string;
    regnum: string;
  }) => {
    console.log(values);
    const { name, email, password, regnum } = values;
    const response = await signUpAndVerifyEmail(name, regnum, email, password);
    const { status, message } = response;
    if (status === "fail") {
      console.log(response.errorMessage);
    } else console.log({ status, message });
  };
  const form = useForm({
    initialValues: {
      name: "",
      email: "",
      password: "",
      "confirm password": "",
      regnum: "",
    },

    validate: {
      email: (value) => (/^\S+@\S+$/.test(value) ? null : "Invalid email"),
      name: (value) => (value === "" ? "Please set a name" : null),
      password: (value) =>
        value.length >= 8 ? null : "Please enter at least 8 digit",
      "confirm password": (value, values) =>
        value !== values.password ? "Passwords did not match" : null,
      regnum: (value) => (value.length === 10 ? null : "Must be 10 digits"),
    },
  });

  return (
    <Center style={{ width: "100%", height: "100vh" }}>
      <Card
        shadow="lg"
        p="lg"
        mx="auto"
        sx={{
          width: "50%",
          height: "80%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <form
          onSubmit={form.onSubmit((values) => {
            return onsubmit(values);
          })}
          style={{
            width: "100%",
          }}
        >
          <TextInput
            required
            label="Name"
            placeholder="your full name"
            {...form.getInputProps("name")}
          />
          <TextInput
            required
            label="Email"
            placeholder="your@email.com"
            {...form.getInputProps("email")}
          />
          <TextInput
            required
            label="Registration number"
            placeholder="Your registration number, e.x :2018331001"
            {...form.getInputProps("regnum")}
          ></TextInput>
          <PasswordInput
            required
            label="Password"
            placeholder="8 digit password"
            {...form.getInputProps("password")}
          />
          <PasswordInput
            required
            label="Confirm password"
            placeholder="Confirm password"
            {...form.getInputProps("confirm password")}
          />

          <Button
            type="submit"
            mt="lg"
            sx={{
              width: "100%",
            }}
          >
            Submit
          </Button>
        </form>
      </Card>
    </Center>
  );
}
