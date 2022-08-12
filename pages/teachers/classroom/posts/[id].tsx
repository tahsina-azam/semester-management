import { Center } from "@mantine/core";
import { useRouter } from "next/router";
import useSWR from "swr";
import Banner from "../../../../src/components/common/post-task-full";
export default function Post() {
  const router = useRouter();
  const { id } = router.query;
  console.log(id);
  const { data, error } = useSWR(`post/${id}`);
  if (!data) return null;
  console.log({ data, error });
  const { id: pid, title, content, created_at, c_id } = data;
  return id ? (
    <Center><Banner
    id={pid}
    title={title}
    content={content}
    created_at={created_at}
    c_id={c_id}
  />
  </Center>
    
  ) : null;
}
