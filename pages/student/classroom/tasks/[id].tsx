import { Center } from "@mantine/core";
import { useRouter } from "next/router";
import useSWR from "swr";
import Banner from "../../../../src/components/post-task-full";
export default function Post() {
  const router = useRouter();
  const { id } = router.query;
  console.log(id);
  const { data, error } = useSWR(`task/${id}`);
  if (!data) return null;
  console.log({ data, error });
  const { id: tid, title, content, created_at, c_id, deadline, score } = data;
  return id ? (
    <Center>
      <Banner
        id={tid}
        title={title}
        content={content}
        created_at={created_at}
        c_id={c_id}
        score={score}
        deadline={deadline}
      />
    </Center>
  ) : null;
}
