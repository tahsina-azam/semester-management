import "semantic-ui-css/semantic.min.css";
import React, { Component, useRef } from "react";
import { Grid, Form } from "semantic-ui-react";
import axios from "axios";

class FormSignUp extends Component {
  state = {
    name: "",
    email: "",
    submittedName: "",
    submittedEmail: "",
    roll: "",
    submittedRoll: "",
    password: "",
    submittedPassword: "",
    confirmPassword: "",
    submittedConfirmPassword: "",
  };

  handleChange = (e, { name, value }) => this.setState({ [name]: value });

  handleSubmit = () => {
    console.log("inside handle submit");
    const { name, email, roll, password, confirmPassword } = this.state;

    this.setState({
      submittedName: name,
      submittedEmail: email,
      submittedRoll: roll,
      submittedPassword: password,
      submittedConfirmPassword: confirmPassword,
    });
    let data = {
      name: name,
      email: email,
      roll: roll,
      password: password,
      confirmPassword: confirmPassword,
    };
    console.log(data);
    axios
      .post("/api/signup", data)
      .then((response) => {
        console.log(response);
      })
      .catch((e) => {
        console.log(e);
      });
  };

  render() {
    const {
      name,
      email,
      submittedName,
      submittedEmail,
      roll,
      submittedRoll,
      password,
      submittedPassword,
      confirmPassword,
      submittedConfirmPassword,
    } = this.state;
    return (
      <div>
        <Form onSubmit={this.handleSubmit}>
          <Grid
            style={{ height: "100vh" }}
            verticalAlign="middle"
            textAlign="center"
          >
            <Grid.Column style={{ maxWidth: 450 }}>
              <div className="field">
                <label>Name</label>
                <Form.Input
                  type="text"
                  name="name"
                  placeholder="name"
                  value={name}
                  id="name"
                  onChange={this.handleChange}
                />
              </div>

              <div className="field">
                <label>E-mail</label>
                <Form.Input
                  type="email"
                  name="email"
                  placeholder="joe@schmoe.com"
                  value={email}
                  onChange={this.handleChange}
                />
              </div>
              <div className="field">
                <label>Roll</label>
                <Form.Input
                  type="text"
                  name="roll"
                  placeholder="enter your roll"
                  value={roll}
                  onChange={this.handleChange}
                />
              </div>
              <div className="field">
                <label>Password</label>
                <Form.Input
                  fluid
                  type="password"
                  name="password"
                  placeholder="enter your password"
                  value={password}
                  onChange={this.handleChange}
                />
              </div>
              <div className="field">
                <label>Confirm Password</label>
                <Form.Input
                  fluid
                  type="password"
                  name="confirmPassword"
                  placeholder="Confirm your password"
                  value={confirmPassword}
                  onChange={this.handleChange}
                />
              </div>
              <Form.Button content="Submit" />
            </Grid.Column>
          </Grid>
        </Form>
      </div>
    );
  }
}

export default FormSignUp;
