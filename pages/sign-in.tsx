import {
  TextInput,
  Group,
  PasswordInput,
  Card,
  Button,
  Center,
} from "@mantine/core";
import { useForm } from "@mantine/form";
import Image from "next/image";
import { useAuth } from "../lib/client/context/auth";
import { TypeButton } from "../src/components/common/Button";

export default function Demo() {
  const { signIn } = useAuth();
  const onsubmit = async (values: { email: string; password: string }) => {
    try {
      const { email, password } = values;
      await signIn(email, password);
    } catch (err) {
      console.log(err);
    }
  };
  const form = useForm({
    initialValues: {
      email: "",
      password: "",
    },
  });

  return (
    <Center style={{ width: "100%", height: "100vh" }}>
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
            m={"md"}
            label="Email"
            placeholder="your@email.com"
            {...form.getInputProps("email")}
          />
          <PasswordInput
            required
            m={"sm"}
            label="Password"
            placeholder="8 digit password"
            {...form.getInputProps("password")}
          />
          <Center>
            <TypeButton/>
          </Center>

          {/* <ComposedButton text={"a"} href={""}/> */}
        </form>
      </Card>
    </Center>
  );
}
