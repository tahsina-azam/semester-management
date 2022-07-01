import { useRouter } from "next/router";
import { useAuth } from "../../../lib/client/context/auth";

export default function withAuth(Component: any) {
  return (props) => {
    const router = useRouter();
    if (typeof window !== "undefined") {
      const auth = useAuth();
      console.log("this is with auth" + auth.isLoggedIn);
      const roles = ["admin", "student", "teacher"];

      if (auth.isLoading) {
        return <div>Loading...</div>;
      }
      if (!auth.user) {
        router.push("/");
        return null;
      } else if (
        roles.some(
          (str) => router.pathname.includes(`/${str}`) && auth.user.role === str
          // FIX: add other roles who can access these routes
        )
      ) {
        return <Component {...props} />;
      }
      router.push("/");
      return null;
    }
    return null;
  };
}
