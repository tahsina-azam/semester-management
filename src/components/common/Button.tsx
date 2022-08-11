import { Button, useMantineTheme, Text } from "@mantine/core";
import Link from "next/link";
import { ReactChild, ReactFragment, ReactNode, ReactPortal } from "react";
export function NavbarButton({ text, href }: { text: string; href: string }) {
  return (
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
      <Link href={href}>{text}</Link>
    </Text>
  );
}
export default function ComposedButton({
  text,
  onClick,
  style,
}: {
  text: string;
  onClick?: () => void;
  style?: object;
}) {
  return (
    <Button
      {...(onClick && { onClick: onClick })}
      {...(style && style)}
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
export function TypeButton({
  text = "Submit",
  onClick,
}: {
  text?: string;
  onClick?: (e) => void;
}) {
  return (
    <Button
      type="submit"
      onClick={onClick}
      m={"sm"}
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
export function IconButton({
  color,
  Icon,
  onClick,
}: {
  color: string;
  Icon: ReactNode;
  onClick?: () => void;
}) {
  return (
    <Button color={color} size="sm" onClick={onClick}>
      {Icon}
    </Button>
  );
}
