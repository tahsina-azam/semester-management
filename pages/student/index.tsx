import AppShellWithRole from "../../../src/components/common/bars";
import { useAuth } from "../../../lib/client/context/auth";

export default function Student(){
  const {user} = useAuth() 

  return <AppShellWithRole user={user}><div></div></AppShellWithRole>
}