import { Button, useMantineTheme, Text } from "@mantine/core";
import Link from "next/link";
import { ReactNode } from "react";
export default function ComposedButton({ text, variant = "normal" }) {
  return (
    <Button
      size="md"
      color={variant === "danger" ? "red" : "teal"}
      style={{
        marginTop: "10px",
        marginBottom: "10px",
        marginRight: "10px",
        marginLeft: "10px",
      }}
    >
      {text}
    </Button>
  );
}
export function NavbarButton({ text, href }: { text: string; href: string }) {
  return (
    <Link href={href} passHref>
      <Text
        m="sm"
        sx={(theme) => ({
          color: theme.colors.dark[7],
          // backgroundColor: theme.colors.gray[0],
          "&:hover": {
            backgroundColor: theme.colors.cyan[1],
            color: theme.colors.indigo[8],
          },
        })}
      >
        {text}
      </Text>
    </Link>
  );
}
export function Logout() {
  return (
    <Link href={"/sign-in"}>
      <Button
        mx="5"
        onClick={() => {
          localStorage.removeItem("token");
          console.log("token removed");
          console.log(localStorage.getItem("token"));
        }}
        mt="auto"
        sx={(theme) => ({
          color: "white",
          fontFamily: theme.fontFamilyMonospace,
          backgroundColor: theme.colors.indigo[5],
          // backgroundColor: theme.colors.gray[0],
          "&:hover": {
            backgroundColor: theme.colors.cyan[1],
            color: theme.colors.indigo[8],
          },
        })}
      >
        Sign out
      </Button>
    </Link>
  );
}
