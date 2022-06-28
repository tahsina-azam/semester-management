import { useAuth } from "../../lib/client/context/auth";
interface roleAndUsage {
  role: string;
  extraType?: string;
  buttonsForSidebar: {
    name: string;
    onClick?: () => void;
    href?: string;
  }[];
}
const roles: roleAndUsage[] = [
  {
    role: "student",
    buttonsForSidebar: [
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
    buttonsForSidebar: [
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
export const roleChangesForHeader = ({
  user,
  extraType,
}: {
  user: { email: string; role: string; name: string };
  extraType?: string;
}) => {
  let arr: { name: string; onClick?: () => void; href?: string }[];
  roles.map((role) => {
    if (extraType && role.role === user.role && role.extraType === extraType) {
      arr = role.buttonsForSidebar;
    }else if(!extraType && role.role === user.role){
      arr = role.buttonsForSidebar;
    }
  });

  return arr;
};
