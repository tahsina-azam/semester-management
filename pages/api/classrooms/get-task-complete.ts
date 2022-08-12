import executeQuery from "../../../config/db";
import {  getTaskComplete } from "../../../lib/client/query";

export default async function (req, res) {
  const { t_id } = req.query;
  const query = getTaskComplete({ t_id });
  console.log({query})
  try {
    const response: any = await executeQuery(query);
    console.log( response );
    res.send({
      data: response,
    });
  } catch (error) {
    res.send({
      data: [],
    });
  }
}
