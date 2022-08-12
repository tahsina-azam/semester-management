import {
  createStyles,
  Text,
  SimpleGrid,
  Container,
  TypographyStylesProvider,
  Card,
  Group,
} from "@mantine/core";
import Router from "next/router";
import { Dispatch, SetStateAction } from "react";
import { Button } from "semantic-ui-react";
import useSWR from "swr";
import { News } from "tabler-icons-react";
import { useAuth } from "../../../lib/client/context/auth";
import ComposedButton from "./Button";

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
  link: string;
  description: string;
  uploader_mail: string;
  uploader_type: string;
  created_at: string;
}

function Feature({
  id,
  link,
  description,
  uploader_mail,
  uploader_type,
  className,
  created_at,
}: FeatureProps) {
  const { classes, cx } = useStyles();
  const { user } = useAuth();
  const { data, error } = useSWR(`resource/${id}`, () => {
    return {
      id,
      link,
      description,
      uploader_mail,
      uploader_type,
      created_at,
    };
  });
  if(error)return null;
  const onClick = () => {
    console.log({ data });
    console.log({
      id,
      link,
      description,
      uploader_mail,
      uploader_type,
      created_at,
    });
  };

  return (
    <div className={cx(classes.feature, className)} onClick={onClick}>
      <div className={classes.overlay} />
      <div className={classes.content}>
        <News size={38} className={classes.icon} />
        <Text weight={700} size="lg" mb="xs" mt={5} className={classes.title}>
            {description}
          </Text>
          <Text color="dimmed" size="sm">
          {uploader_mail}
        </Text>
        <Text color="dimmed" size="sm">
          {created_at}
        </Text>
      </div>
    </div>
  );
}

export default function FeaturesAsymmetricalResource({
  data,
  vis,
  c_id,
}: {
  data: {
    id: string;
    link: string;
    description: string;
    uploader_mail: string;
    uploader_type: string;
    created_at: string;
  }[];
  vis?: Dispatch<SetStateAction<boolean>>;
  c_id: string;
}) {
  console.log({ data });
  const { user } = useAuth();

  const items = data.map((item, index) => <Feature {...item} key={index} />);

  return (
    <Container mt={30} mb={30} size="lg">
      <Group position="right" m={"sm"}>
        <ComposedButton text="Add a file" onClick={() => vis(true)} />
      </Group>
      {data.length === 0 && <Text>No resource is uploaded</Text>}
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
