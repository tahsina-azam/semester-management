import { useAuth } from "../../lib/client/context/auth";
const roles = [
  {
    role: "student",
    buttonsForHeader: [
      {
        name: "Join a class",
        onClick: () => {
          console.log("in button 1");
        },
      },
      {
        name: "Contact for project",
        onClick: () => {
          console.log("in button 2");
        },
      },
    ],
  },
  {
    role: "teacher",
    buttonsForHeader: [
      {
        name: "Join a class",
        onClick: () => {
          console.log("in button 1");
        },
      },
      {
        name: "Contact for project",
        onClick: () => {
          console.log("in button 2");
        },
      },
    ],
  },
];
export const roleChangesForHeader = (user: {
  email: string;
  role: string;
  name: string;
}) => {
  let arr: { name: string; onClick: () => void }[];
  roles.map((role) => {
    if (role.role === user.role) {
      arr = role.buttonsForHeader;
    }
  });
  return arr;
};
