import { Card, TextInput, Button, Center } from "@mantine/core";
import { useForm } from "@mantine/form";
export default function EnterOtp() {
  const form = useForm({
    initialValues: {
      otp: "",
    },
    validate: {
      otp: (value) => (value === "" ? "Please fill this field" : null),
    },
  });
  const onsubmit = (value: { otp: string }) => {
    const { otp } = value;
    console.log(otp);
  };
  return (
    <Center
      style={{
        height: "100vh",
        width: "100%",
      }}
    >
      <Card
        shadow="lg"
        p="lg"
        mx="auto"
        sx={{
          width: "50%",
          height: "50%",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <form
          style={{
            width: "100%",
          }}
        >
          <TextInput
            label="OTP"
            placeholder="enter the 6-digit otp"
            sx={{ width: "50%" }}
            {...form.getInputProps("otp")}
          />
          <Button type="submit" my="lg">
            Submit
          </Button>
        </form>
      </Card>
    </Center>
  );
}
