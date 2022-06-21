import { ThemeContext } from "@emotion/react";
import {  Button, Text, Title, useMantineTheme } from "@mantine/core";
import React, { useState } from "react";
import { Center,ComposedButton } from "../src/components/common";

export default function Homepage() {
  const theme=useMantineTheme()
  return (
    <>
      
      <Center
        style={{
          height: "100vh",
          width: "100%",
        }}
      >
        <Title style={{fontSize: "150px" }}>
          Classademia
        </Title>
        <div>
          <ComposedButton text="Log in" />
          <ComposedButton text="Log in" variant="danger"/>
        </div>
      </Center>
    </>
  );
}
