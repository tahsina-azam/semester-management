import axios from "axios";

export const getAllStudents = function (): { query: string } {
  return {
    query: "SELECT reg_no,name FROM users ",
  };
};
export const getCourseOne = function (classId: string): { query: string } {
  return {
    query: `SELECT * FROM courses WHERE c_id = ${classId};`,
  };
};
export const insertTaskOne = function (data: {
  rte: string;
  title: string;
  score: number;
  timeStampDate: any;
  c_id: string;
}): { query: string } {
  return {
    query:
      "INSERT INTO tasks(description, deadline, score, title, c_id) VALUES('" +
      data.rte +
      "', '" +
      data.timeStampDate +
      "' ,'" +
      data.score +
      "' ,'" +
      data.title +
      "', '" +
      data.c_id +
      "')",
  };
};
export const insertPostOne = function (data: {
  rte: string;
  title: string;
  c_id: string
}): { query: string } {
  return {
    query:
      "INSERT INTO posts(content, title, c_id) VALUES('" +
      data.rte +
      "', '" +
      data.title +
      "', '" +
      data.c_id +
      "')",
  };
};
