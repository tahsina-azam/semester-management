import { useAuth } from "../../lib/client/context/auth";
interface roleAndUsage {
  role: string;
  buttonsForHeader: {
    name: string;
    onClick?: () => void;
    href?: string
  }[]
}
const roles :roleAndUsage[]= [
  {
    role: "student",
    buttonsForHeader: [
      {
        name: "Join a class",
        href: "/student/join-class",
      },
      {
        name: "Contact for project",
       href: "",
      },
    ],
  },
  {
    role: "teacher",
    buttonsForHeader: [
      {
        name: "Create a class",
        href: "/teachers/add-class",
      },
      {
        name: "Post something",
        href: "",
      },
      {
        name: "Assign task",
        href: "/teachers/create-task",
      },
    ],
  },
];
export const roleChangesForHeader = (user: {
  email: string;
  role: string;
  name: string;
}) => {
  let arr: { name: string; onClick?: () => void, href?: string }[];
  roles.map((role) => {
    if (role.role === user.role) {
      arr = role.buttonsForHeader;
    }
  });
  
  return arr;
};
