import "semantic-ui-css/semantic.min.css";
import React, { Component } from "react";
import Router from "next/router";
import {
  Button,
  Form,
  Grid,
  Header,
  Image,
  Message,
  Segment,
} from "semantic-ui-react";
import axios from "axios";

class LoginForm extends Component {
  state = {
    email: "",
    submittedEmail: "",
    password: "",
    submittedPassword: "",
  };

  handleChange = (e, { name, value }) => this.setState({ [name]: value });
  handleSubmit = () => {
    console.log("inside handle submit");
    const { email, password } = this.state;
    this.setState({
      submittedEmail: email,
      submittedPassword: password,
    });
    let data = {
      email: email,
      password: password,
    };
    console.log(data);
    axios
      .post("/api/signin", data)
      .then((response) => {
        console.log(response);
        Router.push(response.data.link);
      })
      .catch((e) => {
        console.log(e);
      });
  };
  render() {
    const { email, password } = this.state;
    return (
      <div>
        <Grid
          textAlign="center"
          style={{ height: "100vh" }}
          verticalAlign="middle"
        >
          <Grid.Column style={{ maxWidth: 450 }}>
            <Header as="h2" color="black" textAlign="center">
              Log-in to your account
            </Header>
            <Form size="large" onSubmit={this.handleSubmit}>
              <Segment stacked>
                <Form.Input
                  fluid
                  icon="user"
                  iconPosition="left"
                  placeholder="E-mail address"
                  name="email"
                  value={email}
                  onChange={this.handleChange}
                />
                <Form.Input
                  fluid
                  icon="lock"
                  iconPosition="left"
                  placeholder="Password"
                  type="password"
                  name="password"
                  value={password}
                  onChange={this.handleChange}
                />
                <Form.Button content="Submit" />
              </Segment>
            </Form>
            <Message>
              New to us? <a href="/choices">Sign Up</a>
            </Message>
          </Grid.Column>
        </Grid>
      </div>
    );
  }
}

export default LoginForm;
