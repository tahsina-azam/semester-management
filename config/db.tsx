import mysql from "serverless-mysql";

const db = mysql({
  config: {
    host: "localhost",
    port: 6033,
    database: "semester_management",
    user: "db_user",
    password: "db_user_pass",
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
