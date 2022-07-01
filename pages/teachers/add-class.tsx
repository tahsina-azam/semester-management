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
import notify, { setNotify } from "../../src/components/common/Notifications";
import { TypeButton } from "../../src/components/common/Button";
export default function AddClassroom() {
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
      code: (value) => (value === "" ? "Please fillup this field" : ""),
      title: (value) => (value === "" ? "Please fillup this field" : ""),
      credit: (value) => (value < 1 ? "Please fillup this field" : ""),
      subject: (value) => (value === "" ? "Please fillup this field" : ""),
      semester: (value) => (value === "" ? "Please fillup this field" : ""),
      year: (value) => (value === "" ? "Please fillup this field" : ""),
    },
  });

  const onsubmit = async (e) => {
    e.preventDefault();
    //""?"":0---> because it matches from lthe eft order and ""!==0
    // this triggers the validation
    form.onSubmit()(e);
    console.log("inside handle submit");
    console.log(Object.values(form.values)[4]);
    if (Object.values(form.errors).every((e) => !e)) {
      console.log("all validated");
      console.log(form.getInputProps("year").value === "");
    }
    console.log("inside handle submit");
    const path = window.location.pathname;
    const array = path.split("/");
    console.log(array[2]);
    let data = {
      title: Object.values(form.values)[1],
      code: Object.values(form.values)[0],
      credit: Object.values(form.values)[2],
      year: Object.values(form.values)[3],
      semester: Object.values(form.values)[4],
      subject: Object.values(form.values)[5],
      t_id: array[2],
    };
    console.log(data);
    try {
      notify({
        id: "course-add",
        loading: true,
        disallowClose: true,
        type: "default",
        title: "Adding your class...",
        text: "You cannot close it yet.",
      });
      const response = await axios.post("/api/teachers/add-class", data);
      console.log({ response });
      const {
        data: { status, message },
      } = response;
      return setTimeout(() => {
        setNotify({
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
            onSubmit={onsubmit}
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
            
            <Group position="center"><TypeButton/></Group>
          </form>
        </Card>
      </Center>
    </div>
  );
}
