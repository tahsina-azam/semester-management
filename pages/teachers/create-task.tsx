import AppShellWithRole from "../../src/components/common/Bars";
import Rte from "../../src/components/rte";

import { useAuth } from "../../lib/client/context/auth";
export default function CreateTask() {
  const { user } = useAuth();
  return (
    <AppShellWithRole user={user}>
      <Rte />
    </AppShellWithRole>
  );
}
