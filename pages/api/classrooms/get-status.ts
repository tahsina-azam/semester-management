import executeQuery from "../../../config/db";
import { getStatus } from "../../../lib/client/query";

export default async function (
  req,res
) {
  const { user_id, id }:{user_id: string, id: string} = req.body;
  console.log("ge")
  const query = getStatus({ user:user_id });
  console.log({ query });
  const response: any = await executeQuery(query);
  console.log(response);
  if (!response[0])
    res.send({
      status: 0,
    });
  else {
    let status = 0
    response.map((res) =>{
         status =res.task.toString()===id?1:0
         console.log(res.task.toString(),id)
         if(status===1)return;
    })
    console.log({ status });
    res.send({
      status,
    });
  }
}
