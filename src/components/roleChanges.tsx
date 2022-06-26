import { useAuth } from "../../lib/client/context/auth";
<<<<<<< HEAD
const roles = [
=======
interface roleAndUsage {
  role: string;
  buttonsForHeader: {
    name: string;
    onClick?: () => void;
    href?: string
  }[]
}
const roles :roleAndUsage[]= [
>>>>>>> fdf9011b31e03f460140b5453e48d26e475abaab
  {
    role: "student",
    buttonsForHeader: [
      {
        name: "Join a class",
<<<<<<< HEAD
        onClick: () => {
          console.log("in button 1");
        },
      },
      {
        name: "Contact for project",
        onClick: () => {
          console.log("in button 2");
        },
=======
        href: ""
      },
      {
        name: "Contact for project",
       href: ""
>>>>>>> fdf9011b31e03f460140b5453e48d26e475abaab
      },
    ],
  },
  {
    role: "teacher",
    buttonsForHeader: [
      {
<<<<<<< HEAD
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
=======
        name: "Create a class",
        href: ""
      },
      {
        name: "Post something",
        href: ""
      },
      {
        name: "Assign task",
        href: ""
>>>>>>> fdf9011b31e03f460140b5453e48d26e475abaab
      },
    ],
  },
];
export const roleChangesForHeader = (user: {
  email: string;
  role: string;
  name: string;
}) => {
<<<<<<< HEAD
  let arr: { name: string; onClick: () => void }[];
=======
  let arr: { name: string; onClick?: () => void, href?: string }[];
>>>>>>> fdf9011b31e03f460140b5453e48d26e475abaab
  roles.map((role) => {
    if (role.role === user.role) {
      arr = role.buttonsForHeader;
    }
  });
<<<<<<< HEAD
=======
  
>>>>>>> fdf9011b31e03f460140b5453e48d26e475abaab
  return arr;
};
