
export default async function handler(req,res) {
    const {token} = await req.query;
    console.log("in the correct place");
}