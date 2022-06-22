import { Button, useMantineTheme } from "@mantine/core";
import { ReactNode } from "react";
import { Logout } from "tabler-icons-react";
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
export function NavbarButton({
  text,
  onClick,
  children,
  color = "dark"
}: {
  text: string;
  onClick: () => void;
  children?: ReactNode;
  color?: string
}) {
  return (
    <Button
      variant="white"
      color={color}
      m="5px"
      onClick={onClick} 
      style={{fontWeight: "lighter"}}     
      sx={(theme) => ({
        backgroundColor: theme.colors.gray[0],
        "&:hover": {
          backgroundColor: theme.colors.gray[1],
        },
      })}
    >
      {text}{children}
    </Button>
  );
}
