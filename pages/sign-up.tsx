import {
  TextInput,
  Group,
  PasswordInput,
  Card,
  Button,
  Center,
  NumberInput,
  Footer,
  LoadingOverlay,
} from "@mantine/core";
import Image from "next/image";
import { useForm } from "@mantine/form";
import { useAuth } from "../lib/client/context/auth";
import { useState } from "react";
import setNotify from "../src/components/common/Notifications";
import { TypeButton } from "../src/components/common/Button";
import notify from "../src/components/common/Notifications";
export default function SignUp() {
  const [load, setLoad] = useState(false)
  const { signUpAndVerifyEmail } = useAuth();
  const onsubmit = async (values: {
    name: string;
    email: string;
    password: string;
    "confirm password": string;
    regnum: string;
  }) => {
    setLoad(true)
    try {
      const response = await signUpAndVerifyEmail(values);
    const { status } = response;
      
    if (status === "fail") {
      setLoad(false)
      if (response.errorMessage)
        return setTimeout(() => {
          notify({
            type: "fail",
            title: "Sorry!",
            text: response.errorMessage,
            autoClose: 2000,
          });
        }, 3000);
      
      return setTimeout(() => {
        notify({
          type: "fail",
          title: "Sorry!",
          text: response.message,
          autoClose: 2000,
        });
      }, 3000);
    }
    console.log({ response });
    setLoad(false)
    return setTimeout(() => {
      notify({
        type: "success",
        title: "Registered!",
        text: "Please check your email account to verify",
        autoClose: 2000,
      });
    }, 3000);
    }catch(err ) {
      setLoad(false)
      notify({
        type: "fail",
        title: "Oops!",
        text: err,
        autoClose: 2000,
      });
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
      email: (value) => null,
      name: (value) =>
        value.length < 2 ? "Name must contain at least 2 characters" : null,
      password: (value) =>
        value.length >= 8 ? null : "Please enter at least 8 digit",
      "confirm password": (value, values) =>
        value !== values.password ? "Passwords did not match" : null,
      regnum: (value) =>
        value.length === 10 ? null : "Must contain 10 numbers",
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
          <LoadingOverlay visible={load}/>
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
              label="Name"
              placeholder="your full name"
              {...form.getInputProps("name")}
            />
            <TextInput
              label="Email"
              type="email"
              placeholder="your@email.com"
              {...form.getInputProps("email")}
            />
            <TextInput
              label="Registration number"
              placeholder="Your registration number, e.x :2018331001"
              {...form.getInputProps("regnum")}
            ></TextInput>
            <PasswordInput
              label="Password"
              placeholder="8 digit password"
              {...form.getInputProps("password")}
            />
            <PasswordInput
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
