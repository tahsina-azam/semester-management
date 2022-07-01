import { TextInput, PasswordInput, Card, Center } from "@mantine/core";
import Image from "next/image";
import { z, ZodSchema } from "zod";
import { useAuth } from "../lib/client/context/auth";
import { setNotify } from "../src/components/common/Notifications";
import { TypeButton } from "../src/components/common/Button";
import notify from "../src/components/common/Notifications";
import { useForm, zodResolver } from "@mantine/form";
export default function SignUp() {
  const { signUpAndVerifyEmail } = useAuth();
  const onsubmit = async (values: {
    name: string;
    email: string;
    password: string;
    confirm: string;
    department: string;
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
          autoClose: 3000,
        });
      }, 4000);
    } else {
      console.log({ status, message });
      return setTimeout(() => {
        setNotify({
          id: "register",
          type: "success",
          title: "Registered!",
          text: "Please check your email account to verify",
          autoClose: 2000,
        });
      }, 3000);
    }
  };
  const schema = z.object({
    name: z.string().min(2, { message: "Name should have at least 2 letters" }),
    email: z.string().email({ message: "Invalid email" }),
    password: z
      .string()
      .min(6, { message: "Password must contain at least 6 characters" }),
    confirm: z.string(),
    department:  z.string().min(3, { message: "Department should have at least 2 letters" }),
  }).refine((data) => data.password === data.confirm, {message:"Passwords don't match"});

  const form = useForm({
    schema: zodResolver(schema),
    initialValues: {
      name: "",
      email: "",
      password: "",
      confirm: "",
      department: "",
    },
  });

  return (
    <div style={{ height: "100vh" }}>
      <Center style={{ width: "100%", height: "auto" }} mt="lg">
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
              label="Department"
              placeholder="CSE"
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
              {...form.getInputProps("confirm")}
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
