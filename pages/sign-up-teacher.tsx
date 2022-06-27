import {
  TextInput,
  Group,
  PasswordInput,
  Card,
  Button,
  Center,
  NumberInput,
  Footer,
} from "@mantine/core";
import Image from "next/image";
import { useForm } from "@mantine/form";
import { useAuth } from "../lib/client/context/auth";
import { useState } from "react";
import ShowNotification from "../src/components/common/Notifications";
import { useRouter } from "next/router";
import { TypeButton } from "../src/components/common/Button";
export default function SignUp() {
  const { signUpAndVerifyEmail } = useAuth();
  const [notify, setNotify] = useState(0);
  const onsubmit = async (values: {
    name: string;
    email: string;
    password: string;
    "confirm password": string;
    department: string;
  }) => {
    console.log(values);
    setNotify(1);
    const response = await signUpAndVerifyEmail(values);
    const { status, message } = response;
    if (status === "fail") {
      setNotify(3);
      console.log(response.errorMessage);
      return;
    } else {
      console.log({ status, message });
      setNotify(2);
      return;
    }
  };
  const form = useForm({
    initialValues: {
      name: "",
      email: "",
      password: "",
      "confirm password": "",
      department: "",
    },

    validate: {
      email: (value) => (/^\S+@\S+$/.test(value) ? null : "Invalid email"),
      name: (value) => (value === "" ? "Please set a name" : null),
      password: (value) =>
        value.length >= 8 ? null : "Please enter at least 8 digit",
      "confirm password": (value, values) =>
        value !== values.password ? "Passwords did not match" : null,
      department: (value) => (value.length === 10 ? null : "Must be 10 digits"),
    },
  });

  return (
    <div style={{ height: "100vh" }}>
      <Center style={{ width: "100%", height: "auto"}} mt="lg">
        <Card
          sx={{
            width: "50%",
            height: "100%",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <Image width={60} height={60} src={"/idea.png"} />
          <form
            onSubmit={form.onSubmit((values) => {
              return onsubmit(values);
            })}
            style={{
              width: "50%",
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
              {...form.getInputProps("department")}
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

            <Center>
              <TypeButton/>
            </Center>
          </form>
        </Card>
        <div style={{ alignSelf: "flex-end", justifySelf: "flex-end" }}>
          {notify === 1 && (
            <ShowNotification type="loading" text="Please wait a while" />
          )}
          {notify === 2 && (
            <ShowNotification
              type="success"
              text="Success! Please check your email. We've sent a verification message."
            />
          )}
          {notify === 3 && (
            <ShowNotification type="fail" text="Sorry! Please try again." />
          )}
        </div>
      </Center>
    </div>
  );
}
