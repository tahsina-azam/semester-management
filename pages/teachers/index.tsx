import { useEffect } from "react";
import { useAuth } from "../../lib/client/context/auth";
import AppShellWithRole from "../../src/components/common/Bars";

export default function Student() {
  const { user } = useAuth();
  useEffect(() => {
    console.log(user.id)//id for teacher
  }, []);
  return (
    <AppShellWithRole user={user}>
      <div>{user.id}</div>
    </AppShellWithRole>
  );
}
