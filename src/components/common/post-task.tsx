import {
  createStyles,
  Text,
  SimpleGrid,
  Container,
  TypographyStylesProvider,
  Card,
} from "@mantine/core";
import Router from "next/router";
import useSWR from "swr";
import { News } from "tabler-icons-react";

const useStyles = createStyles((theme) => ({
  feature: {
    position: "relative",
    paddingTop: theme.spacing.xl,
    paddingLeft: theme.spacing.xl,
  },

  overlay: {
    position: "absolute",
    height: 150,
    width: 200,
    top: 0,
    left: 0,
    backgroundColor: "white",
    zIndex: 2,
  },

  content: {
    position: "relative",
    zIndex: 2,
    padding: 5,
    backgroundColor: theme.colors.violet[0],
  },

  icon: {
    color: theme.colors.indigo[5],
  },

  title: {
    color: theme.colorScheme === "dark" ? theme.white : theme.black,
  },
}));


interface FeatureProps extends React.ComponentPropsWithoutRef<"div"> {
  id: string;
  title: string;
  content: string;
  created_at: string;
  c_id: string;
}

function Feature({
  id,
  title,
  content,
  className,
  created_at,
  c_id,
}: FeatureProps) {
  const { classes, cx } = useStyles();
  const { data, error } = useSWR(`post/${id}`, () => {
    return {
      id,
      title,
      content,
      created_at,
      c_id,
    };
  });

  const onClick = () => {
    console.log("ok");

    console.log({data});
    console.log({ id, title, content, created_at, c_id });
    Router.push(`/student/classroom/posts/${id}`)
  };

  return (
    <div className={cx(classes.feature, className)} onClick={onClick}>
      <div className={classes.overlay} />
      <div className={classes.content}>
        <News size={38} className={classes.icon} />
        <Text weight={700} size="lg" mb="xs" mt={5} className={classes.title}>
          {title}
        </Text>
        <Text color="dimmed" size="sm">
          {created_at}
        </Text>
        <Text color="dimmed" size="sm" lineClamp={3}>
          <TypographyStylesProvider>
            <div dangerouslySetInnerHTML={{ __html: content }} />
          </TypographyStylesProvider>
        </Text>
      </div>
    </div>
  );
}

export default function FeaturesAsymmetrical({
  data,
}: {
  data: {
    id: string;
    content: string;
    title: string;
    created_at: any;
    c_id: string;
  }[];
}) {
  const items = data.map((item, index) => <Feature {...item} key={index} />);

  return (
    <Container mt={30} mb={30} size="lg">
      <SimpleGrid
        cols={3}
        breakpoints={[{ maxWidth: "sm", cols: 1 }]}
        spacing={50}
      >
        {items}
      </SimpleGrid>
    </Container>
  );
}