import {
  createStyles,
  Text,
  SimpleGrid,
  Container,
  Group,
  Center,
  Tooltip,
} from "@mantine/core";
import Image from "next/image";
import { Dispatch, SetStateAction } from "react";
import useSWR from "swr";
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
  uploader_mail?: string;
  uploader_type?: string;
  created_at: string;
  title?: string;
  user?: string;
  type?: string
}

function Feature({
  id,
  link,
  description,
  uploader_mail,
  uploader_type,
  className,
  created_at,
  title,
  user,
  type
}: FeatureProps) {
  const { classes, cx } = useStyles();
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
  if (error) return null;
  const onClick = () => {
    console.log({ data });
    window.open(link);
  };

  return (
    <Tooltip label={"Click to open the file"}><div className={cx(classes.feature, className)} onClick={onClick}>
    <div className={classes.content}>
      <Center m="xs">
        <Image width={30} height={30} src={"/open-book.png"} />
      </Center>

      <Text weight={500} mb="xs" mt={5} className={classes.title}>
        {title}
      </Text>
      <Text color="dimmed" size="sm">
        Uploader: {uploader_mail ? uploader_mail : user}
      </Text>
      <Text color="dimmed" size="sm">
        {description && "Description: " + { description }}
      </Text>
      <Text color="dimmed" size="sm">
        {created_at}
      </Text>
    </div>
  </div></Tooltip>
    
  );
}

export default function FeaturesAsymmetricalResource({
  data,
  vis,
  type 
}: {
  data: {
    id: string;
    link: string;
    description: string;
    uploader_mail?: string;
    uploader_type?: string;
    created_at: string;
    title?: string;
    user?: string;
    type?: string
  }[];
  vis?: Dispatch<SetStateAction<boolean>>;
  type: string
}) {
  console.log({ data });
  const items = data.map((item, index) => <Feature {...item} key={index} />);
  return (
    <Container mt={30} mb={30} size="lg">
      {type!=="nobut" && <Group position="right" m={"sm"}>
        <ComposedButton text="Add a file" onClick={() => vis(true)} />
      </Group>}
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
