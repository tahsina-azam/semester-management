import mysql from "serverless-mysql";

const db = mysql({
  config: {
    host: "sql3.freesqldatabase.com",
    port: 3306,
    database: "sql3487265",
    user: "sql3487265",
    password: process.env.MYSQL_PASSWORD,
  },
});
export default async function excuteQuery({ query, values }) {
  try {
    const results = await db.query(query, values);
    await db.end();
    return results;
  } catch (error) {
    return { error };
  }
}
