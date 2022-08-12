import { Center } from "@mantine/core";
import axios from "axios";
import { useRouter } from "next/router";
import useSWR from "swr";
import FeaturesAsymmetricalResource from "../../../../../src/components/common/show-resource";
const taskComplete = async(url: string) => {
    const taskid = url.split(" ")[1]
    console.log({url})
    const response = await axios.get(`/api/classrooms/get-task-complete?t_id=${taskid}`)
  console.log({response});
  return response.data.data?response.data.data:[];
};
export default function TaskComplete() {
  const router = useRouter();
  const {id} = router.query;
  console.log({id});
   const { data, error } = useSWR("task-completion "+id, taskComplete);
   if (!data || error) return null;
   console.log({data,error});
   if(data.length===0)return<Center>No submission found</Center>
  return  <><FeaturesAsymmetricalResource data={data}/></> ;
}
