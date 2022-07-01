import {Card, Center, Group, Text} from "@mantine/core"
import axios from "axios";
import { Check, X } from "tabler-icons-react";
import { IconButton } from "../common/Button";
import StyleText from "./text-style";
export default function Cards  ({
    name,
    email,
    phone,
    about,
    toggleOpenAndTextType,
  }: {
    name: string;
    email: string;
    phone: string;
    about: string;
    toggleOpenAndTextType: (
      text: string,
      data: { name: string; email: string }
    ) => void;
  }){
    function handleSave() {
      toggleOpenAndTextType("save", {email,name})
    }
    function handleDelete() {
      toggleOpenAndTextType("delete", {email, name});
      return;
    }
    return (
      <Card
        sx={(theme) => ({
          borderStyle: "solid",
          borderWidth: "thin",
          borderColor: theme.colors.indigo[5],
        })}
      >
        <Card.Section
          sx={(theme) => ({
            color: "white",
            fontFamily: theme.fontFamily,
            backgroundColor: theme.colors.indigo[5],
            borderStyle: "solid",
            borderColor: theme.colors.indigo[5],
          })}
        >
          <Center style={{ flexDirection: "column" }}>
            <Text
              transform="capitalize"
              m="sm"
              style={{ fontWeight: "bold" }}
              size="sm"
            >
              {name}
            </Text>
          </Center>
        </Card.Section>
        <Group
          p="sm"
          position="left"
          style={{
            flexDirection: "column",
            justifyContent: "start",
            alignItems: "flex-start",
          }}
        >
          <StyleText text1={email} text2={"Email"} />
          <StyleText text1={phone} text2={"Phone"} />
          <StyleText text1={about} text2={"About"} />
        </Group>
        <Group p="sm">
          <IconButton Icon={<X size={15} />} color="red" onClick={handleDelete} />
          <IconButton
            Icon={<Check size={15} onClick={handleSave}/>}
            color="green"
            onClick={handleSave}
          />
        </Group>
      </Card>
    );
  };
  
  