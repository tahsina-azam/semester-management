<<<<<<< HEAD
import { Center } from "@mantine/core";
import { useRouter } from "next/router";
import useSWR from "swr";
import Banner from "../../../../src/components/post-task-full";
=======
import { useRouter } from "next/router";
import useSWR from "swr";
import { createStyles, Text, Title, TextInput, Button, Image } from '@mantine/core';
// import image from './image.svg';
>>>>>>> 3c0e5dc (post half)
export default function Post() {
  const router = useRouter();
  const { id } = router.query;
  console.log(id);
  const { data, error } = useSWR(`post/${id}`);
  if (!data) return null;
  console.log({ data, error });
<<<<<<< HEAD
  const { id: pid, title, content, created_at, c_id } = data;
  return id ? (
    <Center><Banner
    id={pid}
    title={title}
    content={content}
    created_at={created_at}
    c_id={c_id}
  /></Center>
    
  ) : null;
}
=======
  const {id: pid, title, content, created_at, c_id} = data
  return id ? <EmailBanner/> : null;
}


const useStyles = createStyles((theme) => ({
  wrapper: {
    display: 'flex',
    alignItems: 'center',
    padding: theme.spacing.xl * 2,
    borderRadius: theme.radius.md,
    backgroundColor: theme.colorScheme === 'dark' ? theme.colors.dark[8] : theme.white,
    border: `1px solid ${
      theme.colorScheme === 'dark' ? theme.colors.dark[8] : theme.colors.gray[3]
    }`,

    [`@media (max-width: ${theme.breakpoints.sm}px)`]: {
      flexDirection: 'column-reverse',
      padding: theme.spacing.xl,
    },
  },

  image: {
    maxWidth: '40%',

    [`@media (max-width: ${theme.breakpoints.sm}px)`]: {
      maxWidth: '100%',
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
    color: theme.colorScheme === 'dark' ? theme.white : theme.black,
    fontFamily: `Greycliff CF, ${theme.fontFamily}`,
    lineHeight: 1,
    marginBottom: theme.spacing.md,
  },

  controls: {
    display: 'flex',
    marginTop: theme.spacing.xl,
  },

  inputWrapper: {
    width: '100%',
    flex: '1',
  },

  input: {
    borderTopRightRadius: 0,
    borderBottomRightRadius: 0,
    borderRight: 0,
  },

  control: {
    borderTopLeftRadius: 0,
    borderBottomLeftRadius: 0,
  },
}));

export function EmailBanner() {
  const { classes } = useStyles();
  return (
    <div className={classes.wrapper}>
      <div className={classes.body}>
        <Title className={classes.title}>Wait a minute...</Title>
        <Text weight={500} size="lg" mb={5}>
          Subscribe to our newsletter!
        </Text>
        <Text size="sm" color="dimmed">
          You will never miss important product updates, latest news and community QA sessions. Our
          newsletter is once a week, every Sunday.
        </Text>

        <div className={classes.controls}>
          <TextInput
            placeholder="Your email"
            classNames={{ input: classes.input, root: classes.inputWrapper }}
          />
          <Button className={classes.control}>Subscribe</Button>
        </div>
      </div>
      {/* <Image src={image.src} className={classes.image} /> */}
    </div>
  );
}
>>>>>>> 3c0e5dc (post half)
