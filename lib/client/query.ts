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
