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
  Badge,
} from "@mantine/core";
import { Dispatch, SetStateAction } from "react";
import { Quote } from "tabler-icons-react";
import { useAuth } from "../../lib/client/context/auth";
import ComposedButton, { IconButton } from "./common/Button";
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
}: {
  id: string;
  title: string;
  content: string;
  created_at: string;
  c_id: string;
  vis: Dispatch<SetStateAction<boolean>>;
  stat?: number;
  score?: number;
  deadline?: string;
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
  console.log({diffOfday, diffOfhr, diffOfmin})
  return (
    <Container
      pb="xl"
      style={{ width: "100%", height: "100vh", flexDirection: "column" }}
    >
      <Center style={{ flexDirection: "column" }} p="xl">
        {score && (
          <Text color="teal" weight="bold">
            Score: {score}
          </Text>
        )}
        {deadline && (
          <Group>
            <Text color="red" weight="bold">
              Deadline: {deadline}
            </Text>
            {diffOfmin >= 0 && diffOfday >= 0 && diffOfhr >= 0 && (
              <Text color="blue" weight="bold">
                [Ending in {diffOfmin} minutes, {diffOfhr} hours and {diffOfday}{" "}
                days]
              </Text>
            )}
            {(diffOfmin <0 || diffOfday < 0 || diffOfhr < 0) && (
              <Text color="green" weight="bold">
                [Ended]
              </Text>
            )}
          </Group>
        )}
      </Center>

      <Card withBorder style={{ width: "100%", height: "auto" }}>
        <Card.Section>
          <SimpleGrid cols={2} style={{ width: "100%" }} p="xl">
            <Group position="left">
              <Title>{title}</Title>
            </Group>
            <Group position="right">
              {score && user.role === "student" && (
                <ComposedButton text="Submit task" onClick={() => vis(true)} />
              )}
            </Group>
          </SimpleGrid>
          <Group position="left">
            <Text pl="lg" color="dimmed" size="sm">
              Uploaded at: {created_at}
            </Text>
            {stat === 1 && (
              <Badge
                size="lg"
                radius="sm"
                variant="gradient"
                gradient={{ from: "indigo", to: "cyan" }}
              >
                Done
              </Badge>
            )}
            {stat === 0 && (
              <Badge
                size="lg"
                radius="sm"
                variant="gradient"
                gradient={{ from: "red", to: "orange" }}
              >
                Not Done
              </Badge>
            )}
          </Group>
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
        <IconButton color={"indigo"} Icon={<Quote />} />
      </div>
    </Container>
  );
}
