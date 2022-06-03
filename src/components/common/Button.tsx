import { Button, useMantineTheme } from "@mantine/core";
const ComposedButton = ({ text,variant="normal"}) => {
  return (
    <Button
      size="md"
      color={variant==="danger"?"red": "teal"}
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
};
export default ComposedButton;
