import executeQuery from "../../../config/db";
import { getPostOne } from "../../../lib/client/query";

export default async function(req,res){
    const {id} = req.query;
    const query = getPostOne({id})
    console.log({query})
    const response = await executeQuery(query)
    console.log({response})
    res.send({
        data: response? response: []
    })
}