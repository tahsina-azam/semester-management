import {
  TypographyStylesProvider,
  Text,
  Chip,
  Center,
  createStyles,
  SimpleGrid,
  Card,
  TextInput,
} from "@mantine/core";
import { useState } from "react";
import ComposedButton from "../../src/components/common/Button";
import notify from "../../src/components/common/Notifications";
const useStyles = createStyles((theme, _params, getRef) => ({
  label: {
    "&[data-checked]": {
      "&, &:hover": {
        backgroundColor: theme.colors.blue[theme.fn.primaryShade()],
        color: theme.white,
      },

      [`& .${getRef("iconWrapper")}`]: {
        color: theme.white,
      },
    },
  },

  iconWrapper: {
    ref: getRef("iconWrapper"),
  },
}));
export default function Project() {
  const arr = [
    {
      sender: "Nowshin Alam Owishi",
      subject: "ps",
      content:
        '<p>Hello sir,</p><p>I and my teammate <span class="mention" data-index="0" data-denotation-char="@" data-id="2018331072" data-value="Tahsina Bintay Azam">﻿<span contenteditable="false"><span class="ql-mention-denotation-char">@</span>Tahsina Bintay Azam</span>﻿</span> want to show our project. </p>',
    },
    {
      sender: "Tahsina Bintay Azam",
      subject: "ps 2",
      content: "<p>It is our <strong>100</strong>% submission</p>",
    },
  ];
  return (
    <Center style={{ width: "100%", height: "100vh", flexDirection: "column" }}>
      <SimpleGrid cols={2}>
        {arr.map((a) => (
          <Cards sender={a.sender} content={a.content} subject={a.subject}></Cards>
        ))}
      </SimpleGrid>
    </Center>
  );
}

const Cards = ({
  sender,
  content,
  subject,
}: {
  sender: string;
  content: string;
  subject: string;
}) => {
  const [checked2, setChecked2] = useState(false);
  const [checked1, setChecked1] = useState(false);
  const { classes } = useStyles();
  const onClick = () => {
    const titleForNotify = "Wohoo!";
    const text = "Succesfully submitted!";
    notify({ type: "success", title: titleForNotify, text });
  };
  return (
    <Card withBorder>
      <Card.Section p="lg">
      <Text>Subject: {subject}</Text>
        
      </Card.Section>
      <Text size="sm" color="dimmed">
          Sender: {sender}
        </Text>
      <Text size="sm" color="dimmed"> 
        <TypographyStylesProvider>
          <div dangerouslySetInnerHTML={{ __html: content }} />
        </TypographyStylesProvider>
      </Text>

      <SimpleGrid cols={2} m="lg">
        <Chip
          checked={checked1}
          classNames={classes}
          onChange={() => setChecked1((v) => !v)}
          value="2"
        >
          Approve
        </Chip>
        <Chip
          checked={checked2}
          classNames={classes}
          color="red"
          onChange={() => setChecked2((v) => !v)}
          value="1"
        >
          Disapprove
        </Chip>
      </SimpleGrid>
      <TextInput placeholder="Your opinion" m="lg" />
      <ComposedButton text="Send" onClick={onClick} />
    </Card>
  );
};
