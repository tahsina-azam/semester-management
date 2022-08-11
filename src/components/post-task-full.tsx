import {
  createStyles,
  Text,
  Title,
  TextInput,
  Button,
  Image,
  TypographyStylesProvider,
  Group,
  FileInput,
  Card,
  Center,
  SimpleGrid,
  Container,
} from "@mantine/core";
import { Quote } from "tabler-icons-react";
import { IconButton } from "./common/Button";
// import image from './image.svg';
const useStyles = createStyles((theme) => ({
  wrapper: {
    display: "flex",
    alignItems: "center",
    padding: theme.spacing.xl * 2,
    backgroundColor:
      theme.colorScheme === "dark" ? theme.colors.dark[8] : theme.white,

    // [`@media (max-width: ${theme.breakpoints.sm}px)`]: {
    //   flexDirection: "column-reverse",
    //   padding: theme.spacing.xl,
    // },
  },

  image: {
    maxWidth: "40%",

    [`@media (max-width: ${theme.breakpoints.sm}px)`]: {
      maxWidth: "100%",
    },
  },

  body: {
    paddingRight: theme.spacing.xl * 4,

    [`@media (max-width: ${theme.breakpoints.sm}px)`]: {
      paddingRight: 0,
      marginTop: theme.spacing.xl,
    },
  },

  title: {
    color: theme.colorScheme === "dark" ? theme.white : theme.black,
    fontFamily: `Greycliff CF, ${theme.fontFamily}`,
    lineHeight: 1,
    marginBottom: theme.spacing.md,
  },

  controls: {
    display: "flex",
    marginTop: theme.spacing.xl,
  },

  inputWrapper: {
    width: "100%",
    flex: "1",
  },

  input: {
    borderTopRightRadius: 0,
    borderBottomRightRadius: 0,
    borderRight: 0,
  },

  score: {
    color: theme.colors.indigo[8],
    fontWeight: "bold",
  },
  deadline: {
    color: theme.colors.red[8],
    fontWeight: "bold",
  },

  control: {
    borderTopLeftRadius: 0,
    borderBottomLeftRadius: 0,
    margin: 10
  },
}));

export default function Banner({
  id,
  title,
  content,
  created_at,
  c_id,
  score,
  deadline,
}: {
  id: string;
  title: string;
  content: string;
  created_at: string;
  c_id: string;
  score?: number;
  deadline?: string;
}) {
  const { classes } = useStyles();
  console.log({ score });
  return (
      <Container pb="xl"
        style={{ width: "100%", height: "100vh", flexDirection: "column" }}
      >
        <Center style={{ flexDirection: "column" }} p="xl">
          <Text color="teal" weight="bold">
            Score: {score}
          </Text>
          <Text color="red" weight="bold">
            Deadline: {deadline}
          </Text>
        </Center>

        <Card withBorder style={{ width: "100%", height: "auto" }}>
          <Card.Section>
            <SimpleGrid cols={2} style={{ width: "100%" }} p="xl">
              <Group position="left">
                <Title>{title}</Title>
              </Group>
              <Group position="right">
                <FileInput
                  label="File input"
                  placeholder="Upload your task here"
                />
              </Group>
            </SimpleGrid>
          </Card.Section>

          <Text size="sm" color="dimmed">
            <TypographyStylesProvider>
              <div dangerouslySetInnerHTML={{ __html: content }} />
            </TypographyStylesProvider>
          </Text>
        </Card>
             <div className={classes.controls}>
           <TextInput
             placeholder="Write a comment"
             classNames={{ input: classes.input, root: classes.inputWrapper }}
           />
           <IconButton color={"indigo"} Icon={<Quote/>}/>
         </div>
      </Container>
    // <div className={classes.wrapper}>
    //   <div className={classes.body}>
    //     <Group position="right" className={classes.deadline}>
    //       Deadline: {deadline}
    //     </Group>
    //     <Group position="right" className={classes.score}>
    //       Score: {score}
    //     </Group>
    //     <Group  >
    //     <Title className={classes.title}>{title}</Title>
    //       <FileInput label="Upload file" placeholder="Submit your task" />
    //     </Group>

    //     <Text weight={500} size="lg" mb={5}>
    //       Created at: {created_at}
    //     </Text>

    //     <Text size="sm" color="dimmed">
    //       <TypographyStylesProvider>
    //         <div dangerouslySetInnerHTML={{ __html: content }} />
    //       </TypographyStylesProvider>
    //     </Text>

    //     <div className={classes.controls}>
    //       <TextInput
    //         placeholder="Write a comment"
    //         classNames={{ input: classes.input, root: classes.inputWrapper }}
    //       />
    //       <Button className={classes.control}>Comment</Button>
    //     </div>
    //   </div>
    // </div>
  );
}
