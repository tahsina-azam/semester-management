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
import ShowNotification, {
  setNotify,
} from "../src/components/common/Notifications";
import { useRouter } from "next/router";
import { TypeButton } from "../src/components/common/Button";
import notify from "../src/components/common/Notifications";
export default function SignUp() {
  const { signUpAndVerifyEmail } = useAuth();
  const onsubmit = async (values: {
    name: string;
    email: string;
    password: string;
    "confirm password": string;
    regnum: string;
  }) => {
    console.log(values);
    notify({
      id: "register",
      loading: true,
      disallowClose: true,
      type: "default",
      title: "Registering!",
      text: "Please wait for a minute...",
    });
    const response = await signUpAndVerifyEmail(values);
    const { status, message } = response;
    if (status === "fail") {
      console.log(response.errorMessage);
      return setTimeout(() => {
        setNotify({
          id: "register",
          type: "fail",
          title: "Sorry!",
          text: response.errorMessage,
          autoClose: 2000,
        });
      }, 3000);
    } else {
      console.log({ status, message });
      return setTimeout(() => {
        setNotify({
          id: "register",
          type: "success",
          title: "Registered!",
          text: "We've sent you an email to verify. Please do as instructed in the message",
          autoClose: 2000,
        });
      }, 3000);
    }
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
    <div style={{ height: "100vh" }}>
      <Center style={{ width: "100%", height: "auto" }}>
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

            <Center>
              <TypeButton />
            </Center>
          </form>
        </Card>
      </Center>
    </div>
  );
}
