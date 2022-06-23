import mysql from "serverless-mysql";
import ENV from "./env";
const db = mysql({
  config: {
    host: ENV.DATABASE_HOST,
    port: 3306,
    database: ENV.DATABASE,
    user: ENV.DATABASE_USER,
    password: ENV.DATABASE_PASSWORD,
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
