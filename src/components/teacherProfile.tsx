import "semantic-ui-css/semantic.min.css";
import React, { useState } from "react";
import Image from "next/image";
import axios from "axios";
import { useAuth } from "../../lib/client/context/auth";
import useSWR from "swr";
import { useForm } from "@mantine/form";
import { Center, TextInput, Card, Select } from "@mantine/core";
import ComposedButton, { TypeButton } from "./common/Button";
const getProfile = async (user, url) => {
  const response = await axios.post("/api/profile", {
    email: user.email,
    role: user.role,
  });
  console.log(response.data.result);
  return response.data.result ? response.data.result : {};
};
function FormSignUp() {
  const { user } = useAuth();
  const [name, setName] = useState("");
  const [about, setAbout] = useState("");
  const [phone, setPhone] = useState("");
  const [value1, setValue1] = useState<string | null>(null);
  const [value2, setValue2] = useState<string | null>(null);
  const data = useSWR("profile", (url) => getProfile(user, url), {
    onSuccess: (data, key, config) => {
      setName(data.name);
      setAbout(data.about);
      setPhone(data.phone);
      console.log(name, about, phone);
    },
    onError: (error, x, y) => {
      console.log({ error });
      setName("");
      setAbout("");
      setPhone("");
    },
  });
  if (!data) return null;
  console.log(data);

  console.log({ user });
  const handleSubmit = () => {
    //const semester = value1 + "-" + value2;
    const { email } = user;
    const data = { name, phone, email, about };
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
  return (
    data && (
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
            <TextInput
              required
              label="Name"
              placeholder={name}
              m="lg"
              onChange={(e) => setName(e.target.value)}
            />
            <TextInput
              required
              label="Phone Number"
              placeholder={phone}
              m="lg"
              onChange={(e) => setPhone(e.target.value)}
            />
            <TextInput
              required
              label="About"
              placeholder={about}
              m="lg"
              onChange={(e) => setAbout(e.target.value)}
            />
            {/* <Select
              required
              label="Year"
              placeholder="Pick one"
              value={value1}
              onChange={setValue1}
              data={[
                { value: "1", label: "1st" },
                { value: "2", label: "2nd" },
                { value: "3", label: "3rd" },
                { value: "4", label: "4th" },
              ]}
              m="lg"
            /> */}
            {/* <Select
              label="Semester"
              required
              placeholder="Pick one"
              value={value2}
              onChange={setValue2}
              data={[
                { value: "1", label: "1st" },
                { value: "2", label: "2nd" },
              ]}
              m="lg"
            /> */}

            <Center mt="lg">
              <ComposedButton text="Submit" onClick={handleSubmit} />
            </Center>
          </Card>
        </Center>
      </div>
    )
  );
}

export default FormSignUp;
