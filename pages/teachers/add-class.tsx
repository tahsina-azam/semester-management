// import "semantic-ui-css/semantic.min.css";
// import React, { Component, useRef } from "react";
// import { Grid, Form, Card } from "semantic-ui-react";
// import axios from "axios";
// import { useRouter } from "next/router";

// class AddClassrooms extends Component {
//   state = {
//     code: "",
//     submittedCode: "",
//     title: "",
//     credit: "",
//     submittedTitle: "",
//     submittedCredit: "",
//     subject: "",
//     submittedSubject: "",
//     year: "",
//     submittedYear: "",
//     semester: "",
//     submittedSemester: "",
//   };

//   handleChange = (e, { name, value }) => this.setState({ [name]: value });

//   handleSubmit = () => {
//     console.log("inside handle submit");
//     const { code, title, credit, subject, year, semester } = this.state;
//     const path = window.location.pathname;
//     const array = path.split("/");
//     console.log(array[2]);
//     this.setState({
//       submittedCode: code,
//       submittedTitle: title,
//       submittedCredit: credit,
//       submittedSubject: subject,
//       submittedYear: year,
//       submittedSemester: semester,
//     });
//     let data = {
//       code: code,
//       title: title,
//       credit: credit,
//       subject: subject,
//       year: year,
//       semester: semester,
//       t_id: array[2],
//     };
//     console.log(data);
//     axios
//       .post("/api/teachers/add-class", data)
//       .then((response) => {
//         console.log(response);
//       })
//       .catch((e) => {
//         console.log(e);
//       });
//   };

//   render() {
//     const { code, title, credit, subject, year, semester } = this.state;
//     return (
//       <div>
//         <Form onSubmit={this.handleSubmit}>
//           <Grid
//             style={{ height: "100vh" }}
//             verticalAlign="middle"
//             textAlign="center"
//           >
//             <Grid.Column style={{ maxWidth: 450 }}>
//               <div className="field">
//                 <label>Course Code</label>
//                 <Form.Input
//                   type="text"
//                   name="code"
//                   placeholder="Course code"
//                   value={code}
//                   id="code"
//                   onChange={this.handleChange}
//                 />
//               </div>

//               <div className="field">
//                 <label>Title</label>
//                 <Form.Input
//                   type="text"
//                   name="title"
//                   placeholder="title you want to give to your classroom"
//                   value={title}
//                   id="title"
//                   onChange={this.handleChange}
//                 />
//               </div>

//               <div className="field">
//                 <label>Credit</label>
//                 <Form.Input
//                   type="credit"
//                   name="credit"
//                   placeholder="3.0"
//                   value={credit}
//                   onChange={this.handleChange}
//                 />
//               </div>
//               <div className="field">
//                 <label>Subject</label>
//                 <Form.Input
//                   type="text"
//                   name="subject"
//                   placeholder="enter your subject"
//                   value={subject}
//                   onChange={this.handleChange}
//                 />
//               </div>
//               <div className="field">
//                 <label>Year</label>
//                 <Form.Input
//                   fluid
//                   type="year"
//                   name="year"
//                   placeholder="2"
//                   value={year}
//                   onChange={this.handleChange}
//                 />
//               </div>
//               <div className="field">
//                 <label>Semester</label>
//                 <Form.Input
//                   fluid
//                   type="year"
//                   name="semester"
//                   placeholder="For which semester is this class for"
//                   value={semester}
//                   onChange={this.handleChange}
//                 />
//               </div>
//               <Form.Button content="Submit" />
//             </Grid.Column>
//           </Grid>
//         </Form>
//       </div>
//     );
//   }
// }

// export default AddClassrooms;

import {
  TextInput,
  Group,
  PasswordInput,
  Card,
  Button,
  Center,
  NumberInput,
  Footer,
  Select,
} from "@mantine/core";
import Image from "next/image";
import { useForm } from "@mantine/form";
import { useAuth } from "../../lib/client/context/auth";
import setNotify from "../../src/components/common/Notifications";
import { TypeButton } from "../../src/components/common/Button";
import notify from "../../src/components/common/Notifications";
import { useState } from "react";
export default function AddClassroom() {
  const [val, setVal] = useState("");
  const onsubmit = async (values) => {
    console.log(form.getInputProps("year").value === "");
  };
  const validate = (value) => {
    return value === (null || "") ? "Please fillup this field" : "";
  };
  const form = useForm({
    initialValues: {
      code: "",
      title: "",
      credit: 0,
      year: "",
      semester: "",
    },

    validate: {
      code: (value) => validate(true),
      title: (value) => validate(value),
      credit: (value) => (value === 0 ? "Please insert the credit" : ""),
      semester: (value) => validate(value),
      year: (value) => (value === "" ? "Please fillup this field" : ""),
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
            onSubmit={form.onSubmit((values) => onsubmit(values))}
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
            <Center>
              <TypeButton />
            </Center>
          </form>
        </Card>
      </Center>
    </div>
  );
}
