import {
  createStyles,
  Text,
  Title,
  TextInput,
  Button,
  TypographyStylesProvider,
  Group,
  FileInput,
  Card,
  Center,
  SimpleGrid,
  Container,
  Badge,
  Accordion,
  ThemeIcon,
} from "@mantine/core";
import { Dispatch, SetStateAction } from "react";
import Image from "next/image";
import {
  CalendarStats,
  CalendarTime,
  Edit,
  Quote,
  X,
} from "tabler-icons-react";
import { useAuth } from "../../../lib/client/context/auth";
import ComposedButton, { IconButton } from "./Button";
import Router from "next/router";
const useStyles = createStyles((theme) => ({
  wrapper: {
    display: "flex",
    alignItems: "center",
    padding: theme.spacing.xl * 2,
    backgroundColor:
      theme.colorScheme === "dark" ? theme.colors.dark[8] : theme.white,
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
    margin: 10,
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
  vis,
  stat,
  onComment,
  comment,
  commentSet,
  setDel,
  setEd,
}: {
  id: string;
  title: string;
  content: string;
  created_at: string;
  c_id: string;
  vis?: Dispatch<SetStateAction<boolean>>;
  stat?: 1 | 0;
  score?: number;
  deadline?: string;
  onComment: () => void;
  comment: Dispatch<SetStateAction<string>>;
  commentSet: {
    body: string;
    name: string;
  }[];
  setEd: Dispatch<SetStateAction<boolean>>;
  setDel: Dispatch<SetStateAction<boolean>>;
}) {
  const { classes } = useStyles();
  const { user } = useAuth();
  const deadlineDate = new Date(deadline + "+6:00").getTimezoneOffset();
  const diffInMin =
    (Date.parse(deadline + "+6:00") - Date.now() + deadlineDate) / (60 * 1000);
  const diffOfday = Math.floor(diffInMin.valueOf() / (24 * 60));
  const diffOfhr = Math.floor(
    (diffInMin.valueOf() - diffOfday.valueOf() * 24) / 60
  );
  const diffOfmin = Math.floor(diffInMin.valueOf() - diffOfhr.valueOf() * 60);
  console.log({ commentSet });
  return (
    <Container
      pb="xl"
      style={{ width: "100%", height: "100vh", flexDirection: "column" }}
    >
      <Group position="right" pt="xl">
        {score && (
          <Text color="indigo" weight="bold">
            Score: {score}
          </Text>
        )}
      </Group>

      <Card withBorder style={{ width: "100%", height: "auto" }}>
        <Card.Section>
          <SimpleGrid cols={2} style={{ width: "100%" }} p="xl">
            <Group position="left">
              <Title>{title}</Title>
            </Group>
            <Group position="right">
              {user.role === "teacher" && (
                <Group position="center" m={"sm"}>
                  <IconButton Icon={<X />} color={"red"} onClick={() => setDel(true)}/>
                  <IconButton Icon={<Edit />} color="green" onClick={() => setDel(true)}/>
                </Group>
              )}
              {score && user.role === "student" && (
                <ComposedButton text="Submit task" onClick={() => vis(true)} />
              )}
            </Group>
          </SimpleGrid>
          <Group position="left">
            <Text pl="lg" color="dimmed" size="sm">
              Uploaded at: {created_at}
            </Text>
          </Group>
        </Card.Section>

        <Text size="sm" color="dimmed">
          <TypographyStylesProvider>
            <div dangerouslySetInnerHTML={{ __html: content }} />
          </TypographyStylesProvider>
        </Text>
      </Card>
      {score && (
        <Accordion defaultValue="deadline">
          <Accordion.Item value="deadline">
            <Accordion.Control>
              <SimpleGrid cols={2}>
                <Group>
                  <Image width={30} height={30} src={"/deadline.png"} />
                  <Text>Deadline</Text>
                </Group>
                <Group position="right">
                  {stat === 1 && <Badge color={"green"}>Submitted</Badge>}
                  {stat === 0 && <Badge color={"red"}>Not Submitted</Badge>}
                </Group>
              </SimpleGrid>
            </Accordion.Control>
            <Accordion.Panel>
              <Text color={"red"}>{deadline}</Text>
              {diffOfmin >= 0 && diffOfday >= 0 && diffOfhr >= 0 && (
                <Text color="blue">
                  [Ending in {diffOfmin} minutes, {diffOfhr} hours and{" "}
                  {diffOfday} days]
                </Text>
              )}
              {(diffOfmin < 0 || diffOfday < 0 || diffOfhr < 0) && (
                <Text color="green" weight="bold">
                  [Ended]
                </Text>
              )}
            </Accordion.Panel>
          </Accordion.Item>
        </Accordion>
      )}

      {user.role === "teacher" && score && (
        <Center mt="lg">
          <ComposedButton
            text="View submitted task"
            onClick={() =>
              Router.push(`/teachers/classroom/tasks/${id}/task-submission`)
            }
          />
        </Center>
      )}
      <div className={classes.controls}>
        <TextInput
          placeholder="Write a comment"
          onChange={(e) => comment(e.target.value)}
          classNames={{ input: classes.input, root: classes.inputWrapper }}
        />
        <IconButton color={"indigo"} Icon={<Quote />} onClick={onComment} />
      </div>
      {commentSet.length !== 0 &&
        commentSet.map((comm) => (
          <Card withBorder className={classes.controls}>
            <Text color={"indigo"} pr="lg">
              {comm.name}:
            </Text>
            <Text>{comm.body}</Text>
          </Card>
        ))}
    </Container>
  );
}
