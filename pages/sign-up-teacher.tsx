// import "semantic-ui-css/semantic.min.css";
// import React, { Component, useRef } from "react";
// import { Grid, Form } from "semantic-ui-react";
// import axios from "axios";

// class FormSignUp extends Component {
//   state = {
//     name: "",
//     email: "",
//     submittedName: "",
//     submittedEmail: "",
//     department: "",
//     submittedDepartment: "",
//     password: "",
//     submittedPassword: "",
//     confirmPassword: "",
//     submittedConfirmPassword: "",
//   };

//   handleChange = (e, { name, value }) => this.setState({ [name]: value });

//   handleSubmit = () => {
//     console.log("inside handle submit");
//     const { name, email, department, password, confirmPassword } = this.state;

//     this.setState({
//       submittedName: name,
//       submittedEmail: email,
//       submittedDepartment: department,
//       submittedPassword: password,
//       submittedConfirmPassword: confirmPassword,
//     });
//     let data = {
//       name: name,
//       email: email,
//       department: department,
//       password: password,
//       confirmPassword: confirmPassword,
//     };
//     console.log(data);
//     axios
//       .post("/api/signup/teacher", data)
//       .then((response) => {
//         console.log(response);
//       })
//       .catch((e) => {
//         console.log(e);
//       });
//   };

//   render() {
//     const {
//       name,
//       email,
//       submittedName,
//       submittedEmail,
//       department,
//       submittedDepartment,
//       password,
//       submittedPassword,
//       confirmPassword,
//       submittedConfirmPassword,
//     } = this.state;
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
//                 <label>Name</label>
//                 <Form.Input
//                   type="text"
//                   name="name"
//                   placeholder="name"
//                   value={name}
//                   id="name"
//                   onChange={this.handleChange}
//                 />
//               </div>

//               <div className="field">
//                 <label>E-mail</label>
//                 <Form.Input
//                   type="email"
//                   name="email"
//                   placeholder="joe@schmoe.com"
//                   value={email}
//                   onChange={this.handleChange}
//                 />
//               </div>
//               <div className="field">
//                 <label>department</label>
//                 <Form.Input
//                   type="text"
//                   name="department"
//                   placeholder="enter your department"
//                   value={department}
//                   onChange={this.handleChange}
//                 />
//               </div>
//               <div className="field">
//                 <label>Password</label>
//                 <Form.Input
//                   fluid
//                   type="password"
//                   name="password"
//                   placeholder="enter your password"
//                   value={password}
//                   onChange={this.handleChange}
//                 />
//               </div>
//               <div className="field">
//                 <label>Confirm Password</label>
//                 <Form.Input
//                   fluid
//                   type="password"
//                   name="confirmPassword"
//                   placeholder="Confirm your password"
//                   value={confirmPassword}
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

// export default FormSignUp;
import {
  TextInput,
  Group,
  PasswordInput,
  Card,
  Button,
  NumberInput,
} from "@mantine/core";
import { ComposedButton, Center } from "../src/components/common";
import { useForm } from "@mantine/form";
import { useAuth } from "../lib/client/context/auth";
export default function SignUpTeacher() {
  const { signUpAndVerifyEmail } = useAuth();
  const onsubmit = async (values: {
    name: string;
    email: string;
    password: string;
    "confirm password": string;
    department: string;
  }) => {
    console.log(values);
    const response = await signUpAndVerifyEmail(values);
    const { status, message } = response;
    if (status === "fail") {
      console.log(response.errorMessage);
    } else console.log({ status, message });
  };
  const form = useForm({
    initialValues: {
      name: "",
      email: "",
      password: "",
      "confirm password": "",
      department: "",
    },

    validate: {
      email: (value) => (/^\S+@\S+$/.test(value) ? null : "Invalid email"),
      name: (value) => (value === "" ? "Please set a name" : null),
      password: (value) =>
        value.length >= 8 ? null : "Please enter at least 8 digit",
      "confirm password": (value, values) =>
        value !== values.password ? "Passwords did not match" : null,
      department: (value) =>
        value === null ? "Please set a department" : null,
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
            placeholder="Your designated department, e.x. CSE"
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
            {...form.getInputProps("confirm password")}
          />

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
