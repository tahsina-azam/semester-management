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
    extraType: "default",
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
    extraType: "default",
    buttonsForSidebar: [
      {
        name: "Create a class",
        href: "/teachers/add-class",
      },
    ],
  },
  {
    role: "teacher",
    extraType: "classroom",
    buttonsForSidebar: [
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
  {
    role: "student",
    extraType: "classroom",
    buttonsForSidebar: [
      {
        name: "Get Posts",
        href: "",
      },
      {
        name: "Get task",
        href: "",
      },
    ],
  },
];
export const roleChangesForHeader = ({
  user,
  extraType = "default",
}: {
  user: { email: string; role: string; name: string };
  extraType?: string;
}) => {
  let arr: { name: string; onClick?: () => void; href?: string }[];
  
  roles.map((role) => {
    if (role.role === user.role && extraType && role.extraType === extraType) {
      arr = role.buttonsForSidebar;
    }
  });

  return arr;
};
