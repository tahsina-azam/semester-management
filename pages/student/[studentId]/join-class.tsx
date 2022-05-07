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

class JoinClass extends Component {
  state = {
    code: "",
    submittedCode: "",
  };

  handleChange = (e, { name, value }) => this.setState({ [name]: value });
  handleSubmit = () => {
    console.log("inside handle submit");
    const { code } = this.state;
    this.setState({
      submittedCode: code,
    });
    const path = window.location.pathname;
    const arr = path.split("/");
    console.log();
    let data = {
      code: code,
      roll: arr[2],
    };
    console.log(data);
    axios
      .post("/api/student/join-class", data)
      .then((response) => {
        console.log(response);
        Router.push(response.data.link);
      })
      .catch((e) => {
        console.log(e);
      });
  };
  render() {
    const { code } = this.state;
    return (
      <div>
        <Grid
          textAlign="center"
          style={{ height: "100vh" }}
          verticalAlign="middle"
        >
          <Grid.Column style={{ maxWidth: 450 }}>
            <Header as="h2" color="black" textAlign="center">
              Join your classroom
            </Header>
            <Form size="large" onSubmit={this.handleSubmit}>
              <Segment stacked>
                <Form.Input
                  fluid
                  icon="lock"
                  iconPosition="left"
                  placeholder="Enter your classroom code here"
                  name="code"
                  value={code}
                  onChange={this.handleChange}
                />

                <Form.Button content="Submit" />
              </Segment>
            </Form>
          </Grid.Column>
        </Grid>
      </div>
    );
  }
}

export default JoinClass;
