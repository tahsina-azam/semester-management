import "semantic-ui-css/semantic.min.css";
import React, { Component, useRef } from "react";
import { Grid, Form } from "semantic-ui-react";
import Image from "next/image";
import axios from "axios";
import { useAuth } from "../../lib/client/context/auth";
import { useState, useEffect } from "react";

function FormSignUp() {
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [about, setAbout] = useState("");
  var info = [];
  const { user } = useAuth();
  // useEffect(() => {
  //   return () => {
  //     axios
  //       .post("/api/profile", { email: user.email, role: user.role })
  //       .then((response) => {
  //         console.log({ response });
  //         info = response.data;
  //         console.log("this is info" + info);
  //       })
  //       .catch((e) => {
  //         console.log(e);
  //       });
  //   };
  // }, []);

  console.log("user->" + { user });
  const handleSubmit = () => {
    console.log("inside handle submit");

    let data = {
      name: name,
      email: user.email,
      phone: phone,
      about: about,
      role: user.role,
    };
    console.log(data);
    axios
      .post("/api/profile/update", data)
      .then((response) => {
        console.log(response);
      })
      .catch((e) => {
        console.log(e);
      });
  };

  return (
    <div>
      <Form>
        <Grid
          style={{ height: "100vh" }}
          verticalAlign="middle"
          textAlign="center"
        >
          <Grid.Column style={{ maxWidth: 450 }}>
            <Image width={60} height={60} src={"/idea.png"} />
            <div className="field">
              <label>Name</label>
              <Form.Input
                type="text"
                name="name"
                placeholder={user.name}
                value={name}
                id="name"
                onChange={(e) => setName(e.target.value)}
              />
            </div>
            <div className="field">
              <label>Phone</label>
              <Form.Input
                fluid
                type="text"
                name="phone"
                placeholder=""
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
              />
            </div>
            <div className="field">
              <label>About</label>
              <Form.Input
                fluid
                type="text"
                name="about"
                placeholder=""
                value={about}
                onChange={(e) => setAbout(e.target.value)}
              />
            </div>
            <Form.Button
              content="Submit"
              color="violet"
              onClick={handleSubmit}
            />
          </Grid.Column>
        </Grid>
      </Form>
    </div>
  );
}

export default FormSignUp;
