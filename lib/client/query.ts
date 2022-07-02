import axios from "axios";

export const getAllStudents = function (): { query: string } {
  return {
    query: "SELECT reg_no,name FROM users ",
  };
};
