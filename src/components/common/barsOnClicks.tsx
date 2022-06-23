import { useRouter } from "next/router";

export default function AllOnClick() {
  const route = useRouter();
  const logout = () => {
    localStorage.removeItem("token");
    console.log(localStorage.getItem("token"));
    route.push("/sign-in");
  };
  return {logout}
}
