import executeQuery from "../../../config/db";
import { getStatus } from "../../../lib/client/query";

export default async function (
  req: { query: { user_id: any } },
  res: { send: (arg0: { status: number }) => void }
) {
  const { user_id } = req.query;
  const user = user_id.substring(0, 10);
  const id = user_id.substring(14, user_id.length);
  console.log({ user, id });
  const query = getStatus({ user });
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
