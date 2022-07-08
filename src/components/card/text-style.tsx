import { Group, Text } from "@mantine/core";

export default function StyleText({ text1, text2 }) {
  return (
    <Group position="left">
      <Text
        style={{ fontWeight: "bold", fontSize: "14px" }}
        sx={(theme) => ({
          color: theme.colors.blue[6],
        })}
      >
        {text2} :
      </Text>
      <Text>{text1}</Text>
    </Group>
  );
}
