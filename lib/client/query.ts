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
export const insertResourceOne = function (data: {
  link: string;
  description: string;
  uploader_type: string;
  uploader_mail: string;
  c_id: string
}): { query: string } {
  return {
    query:
      "INSERT INTO resources(link, description, uploader_mail, uploader_type, c_id) VALUES('" +
      data.link +
      "', '" +
      data.description +
      "', '" +
      data.uploader_mail +
      "', '" +
      data.uploader_type +
      "', '" +
      data.c_id +
      "')",
  };
};
