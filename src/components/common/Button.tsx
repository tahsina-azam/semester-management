import { Button, useMantineTheme, Text } from "@mantine/core";
import Link from "next/link";
import { ReactChild, ReactFragment, ReactPortal } from "react";
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
export function ComposedButton({
  text,
  onClick,
  styles,
}: {
  text: string;
  onClick?: () => void;
  styles?: object;
}) {
  return (
    <Button
      {...(onClick && { onClick: onClick })}
      {...(styles && styles)}
      sx={(theme) => ({
        color: "white",
        fontFamily: theme.fontFamilyMonospace,
        backgroundColor: theme.colors.indigo[5],
        "&:hover": {
          backgroundColor: theme.colors.cyan[2],
          color: theme.colors.blue[7],
        },
      })}
    >
      {text}
    </Button>
  );
}
