import {
  Button,
  Text,
  Title,
  useMantineTheme,
  Center,
  Group,
} from "@mantine/core";
import Link from "next/link";
import React, { useState } from "react";
import { ComposedButton } from "../src/components/common";
import Image from "next/image";

export default function Homepage() {
  const theme = useMantineTheme();
  return (
    <>
      <Center
        style={{
          height: "100vh",
          width: "100%",
          flexDirection: "column",
        }}
        // sx={(theme) => ({
        //   backgroundColor: theme.colors.indigo[1],
        // })}
      >
        <Group p={"md"}>
          <Image width={60} height={60} src={"/idea.png"} />{" "}
          <Text
            style={{ fontSize: "40px", fontWeight: "bold" }}
            variant="gradient"
            gradient={{ from: "indigo", to: "cyan", deg: 40 }}
          >
            Classademia
          </Text>
        </Group>

        <div>
          <Link href={"/sign-in"} passHref>
            <ComposedButton text="Log in" style={{ m: "md" }} />
          </Link>
          <Link href={"/sign-up"} passHref>
            <ComposedButton text="Sign up" style={{ m: "md" }} />
          </Link>
          <Link href={"/sign-up-teacher"} passHref>
            <ComposedButton text="Sign up as a teacher" style={{ m: "md" }} />
          </Link>
        </div>
      </Center>
    </>
  );
}
