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
} from "@mantine/core";
// import image from './image.svg';
const useStyles = createStyles((theme) => ({
  wrapper: {
    display: "flex",
    alignItems: "center",
    padding: theme.spacing.xl * 2,
    borderRadius: theme.radius.md,
    backgroundColor:
      theme.colorScheme === "dark" ? theme.colors.dark[8] : theme.white,
    border: `1px solid ${
      theme.colorScheme === "dark" ? theme.colors.dark[8] : theme.colors.gray[3]
    }`,

    [`@media (max-width: ${theme.breakpoints.sm}px)`]: {
      flexDirection: "column-reverse",
      padding: theme.spacing.xl,
    },
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
    <div className={classes.wrapper}>
      <div className={classes.body}>
        <Group position="right" className={classes.deadline}>
          Deadline: {deadline}
        </Group>
        <Group position="right" className={classes.score}>
          Score: {score}
        </Group>
        <Group position="right" >
          <FileInput label="Upload file" placeholder="Submit your task"/>
        </Group>
        <Title className={classes.title}>{title}</Title>
        <Text weight={500} size="lg" mb={5}>
          Created at: {created_at}
        </Text>

        <Text size="sm" color="dimmed">
          <TypographyStylesProvider>
            <div dangerouslySetInnerHTML={{ __html: content }} />
          </TypographyStylesProvider>
        </Text>

        <div className={classes.controls}>
          <TextInput
            placeholder="Write a comment"
            classNames={{ input: classes.input, root: classes.inputWrapper }}
          />
          <Button className={classes.control}>Comment</Button>
        </div>
      </div>
    </div>
  );
}
