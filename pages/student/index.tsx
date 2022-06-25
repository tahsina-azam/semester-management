import { useAuth } from "../../lib/client/context/auth";
import AppShellWithRole from "../../src/components/common/Bars";

export default function Student(){
  const {user} = useAuth() 

  return <AppShellWithRole user={user}><div></div></AppShellWithRole>
}