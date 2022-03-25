import { useUser } from "@auth0/nextjs-auth0";
import "semantic-ui-css/semantic.min.css";
import React, { Component } from "react";
import { Grid } from "semantic-ui-react";
export default function SignUp() {
  const { user, error, isLoading } = useUser();
  console.log(user);
  if (user) {
    return (
      <>
        <h1>Welcome {user.name}!</h1>
        <a href="/api/auth/logout">Logout</a>
      </>
    );
  }
  return (
    <>
      <Grid
        style={{ height: "100vh" }}
        verticalAlign="middle"
        textAlign="center"
      >
        <Grid.Column style={{ maxWidth: 450 }}>
          <form className="ui form">
            <div className="field">
              <label>Name</label>
              <input type="text" name="name" placeholder="Name" />
            </div>

            <div className="field">
              <label>E-mail</label>
              <input type="email" placeholder="joe@schmoe.com" />
            </div>
            <div className="field">
              <label>Password</label>
              <input
                type="text"
                name="Password"
                placeholder="enter your password"
              />
            </div>
            <div className="field">
              <label>Confirm Password</label>
              <input
                type="text"
                name="ConfirmPassword"
                placeholder="Confirm your password"
              />
            </div>

            <div className="field">
              <div className="ui checkbox">
                <input type="checkbox" className="hidden" />
                <label>I agree to the Terms and Conditions</label>
              </div>
            </div>
            <button className="ui button" type="submit">
              Submit
            </button>
          </form>
        </Grid.Column>
      </Grid>
    </>
  );
}
