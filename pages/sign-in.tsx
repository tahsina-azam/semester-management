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

    validate: {
      email: (value) => (/^\S+@\S+$/.test(value) ? null : "Invalid email"),
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
            <Button
              type="submit"
              m={"sm"}
              sx={(theme) => ({
                color: "white",
                fontFamily: theme.fontFamilyMonospace,
                backgroundColor: theme.colors.indigo[5],
                "&:hover": {
                  backgroundColor: theme.colors.cyan[2],
                  color: theme.colors.blue[7],
                },
              })}
            >
              Submit
            </Button>
          </Center>

          {/* <ComposedButton text={"a"} href={""}/> */}
        </form>
      </Card>
    </Center>
  );
}
