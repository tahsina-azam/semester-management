import {
  TextInput,
  Card,
  Button,
  Center,
  NumberInput,
  Footer,
  Select,
  Group,
} from "@mantine/core";
import { useForm } from "@mantine/form";
import Image from "next/image";
import axios from "axios";
import notify, {
  setNotify,
} from "../../src/components/common/Notifications";
import { TypeButton } from "../../src/components/common/Button";
import { useAuth } from "../../lib/client/context/auth";
import Router from "next/router";
export default function AddClassroom() {
  const { user } = useAuth();
  const form = useForm({
    initialValues: {
      code: "",
      title: "",
      credit: 0,
      subject: "",
      year: "",
      semester: "",
    },

    validate: {
      code: (value) => (value === "" ? "Please fillup this field" : null),
      title: (value) => (value === "" ? "Please fillup this field" : null),
      credit: (value) => (value < 1 ? "Please fillup this field" : null),
      subject: (value) => (value === "" ? "Please fillup this field" : null),
      semester: (value) => (value === "" ? "Please fillup this field" : null),
      year: (value) => (value === "" ? "Please fillup this field" : null),
    },
  });

  const onsubmit = async (e, values: any) => {
    e.preventDefault();
    //""?"":0---> because it matches from lthe eft order and ""!==0
    // this triggers the validation
    console.log("inside handle submit");
    console.log("inside handle submit");
    console.log({ user });
    let data = {
      values,
      t_id: user.id,
    };
    try {
      notify({
        id: "course-add",
        loading: true,
        disallowClose: true,
        type: "default",
        title: "Adding your class...",
        text: "You cannot close it yet.",
      });
      const response = await axios.post("/api/teachers/add-class", { data });
      const {
        data: { status, message },
      } = response;
      console.log({ status });
      if (status === "success") Router.push(response.data.link);
      return setTimeout(() => {
        setNotify({
          id: "course-add",
          type: status,
          title: message,
          text:
            status === "success"
              ? "Share this course to your students!"
              : response.data.errorMessage,
          autoClose: 2000,
        });
      }, 3000);
    } catch (err) {
      console.log(err);
      return setTimeout(() => {
        setNotify({
          id: "course-add",
          type: "fail",
          title: "Sorry!",
          text: err,
          autoClose: 2000,
        });
      }, 3000);
    }
  };

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
            onSubmit={(form.onSubmit = (e, values) => onsubmit(e, values))}
            style={{
              width: "50%",
            }}
          >
            <TextInput
              required
              label="Code"
              placeholder="e.x. CSE333"
              {...form.getInputProps("code")}
            />
            <TextInput
              required
              label="Title"
              placeholder="Title of the course"
              {...form.getInputProps("title")}
            />
            <TextInput
              required
              label="Department"
              placeholder="Department that provides the course"
              {...form.getInputProps("subject")}
            />
            <NumberInput
              required
              label="Credits"
              placeholder="The credit of the course"
              {...form.getInputProps("credit")}
            ></NumberInput>
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

            <Group position="center">
              <TypeButton />
            </Group>
          </form>
        </Card>
      </Center>
    </div>
  );
}
