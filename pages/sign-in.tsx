import { TextInput, Group, PasswordInput, Card, Button } from "@mantine/core";
import { ComposedButton, Center } from "../src/components/common";
import { useForm } from "@mantine/form";
import { useAuth } from "../lib/client/context/auth";

export default function Demo() {
  const { signIn } = useAuth();
  const onsubmit = async (values: { email: string; password: string }) => {
    try {
      const { email, password } = values;
      const response = await signIn(email, password);
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
            label="Email"
            placeholder="your@email.com"
            {...form.getInputProps("email")}
          />
          <PasswordInput
            required
            label="Password"
            placeholder="8 digit password"
            {...form.getInputProps("password")}
          />
          {/* <PasswordInput
            required
            label="Confirm password"
            placeholder="Confirm password"
            {...form.getInputProps('confirm password')}
          /> */}

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
