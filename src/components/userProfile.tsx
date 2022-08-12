import "semantic-ui-css/semantic.min.css";
import React from "react";
import Image from "next/image";
import axios from "axios";
import { useAuth } from "../../lib/client/context/auth";
import useSWR from "swr";
import { useForm } from "@mantine/form";
import { Center, TextInput, Card, Select } from "@mantine/core";
import { TypeButton } from "./common/Button";
const getProfile = async (user) => {
  const response = await axios.post("/api/profile", {
    email: user.email,
    role: user.role,
  });
  console.log({ response });
  return response.data?.result;
};
function FormSignUp() {
  const { user } = useAuth();
  const info = useSWR("profile", () => getProfile(user));
  console.log({ info });
  if (!info) return null;
  console.log("user->" + { user });
  const handleSubmit = (values) => {
    console.log("inside handle submit");
    axios
      .post("/api/profile/update", data)
      .then((response) => {
        console.log(response);
      })
      .catch((e) => {
        console.log(e);
      });
  };
  const form = useForm({
    initialValues: {
      name: info.data.name,
      phone: info.data.phone,
      about: info.data.about,
      year: "",
      semester: "",
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
              return handleSubmit(values);
            })}
            style={{
              width: "50%",
            }}
          >
            <TextInput required label="Name" {...form.getInputProps("name")} />
            <TextInput
              required
              label="Phone Number"
              {...form.getInputProps("phone")}
            />
            <TextInput
              required
              label="About"
              {...form.getInputProps("about")}
            />
            <Select
              required
              label="Year"
              placeholder="Pick one"
              data={[
                { value: "1", label: "1st" },
                { value: "2", label: "2nd" },
                { value: "3", label: "3rd" },
                { value: "4", label: "4th" },
              ]}
              {...form.getInputProps("year")}
            />
            <Select
              label="Semester"
              placeholder="Pick one"
              data={[
                { value: "1", label: "1st" },
                { value: "2", label: "2nd" },
              ]}
              {...form.getInputProps("semester")}
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

export default FormSignUp;
