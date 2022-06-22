import React, { ReactNode, useState } from "react";
import logo from "../../logo/pinwheel.png";
import {
  AppShell,
  Navbar,
  Header,
  Footer,
  Aside,
  Text,
  MediaQuery,
  Burger,
  Button,
  useMantineTheme,
  Image,
  Title,
} from "@mantine/core";
import { Logout } from "tabler-icons-react";
import { roleChangesForHeader } from "./roleChanges";
import { User } from "../../../lib/common/types";
import { NavbarButton } from "./Button";
export default function AppShellWithRole({
  children,
  user,
}: {
  children: ReactNode;
  user: User;
}) {
  const theme = useMantineTheme();
  console.log({ user });
  const buttonOfHeader = roleChangesForHeader(user);
  console.log(buttonOfHeader);
  const [opened, setOpened] = useState(false);
  let i = 0;
  return (
    <AppShell
      styles={{
        main: {
          background: theme.colors.gray[0],
        },
      }}
      navbarOffsetBreakpoint="sm"
      asideOffsetBreakpoint="sm"
      fixed
      navbar={
        <Navbar
          p="md"
          hiddenBreakpoint="sm"
          hidden={!opened}
          width={{ sm: 200, lg: 200 }}
        >
          {buttonOfHeader.map((but) => (
            <NavbarButton text={but.name} onClick={but.onClick} />
          ))}
          <NavbarButton text="Edit account" onClick={() => {}}/>
        </Navbar>
      }
      // aside={
      //   <MediaQuery smallerThan="sm" styles={{ display: "none" }}>
      //     <Aside p="md" hiddenBreakpoint="sm" width={{ sm: 200, lg: 300 }}>
      //       <Text>Application sidebar</Text>
      //     </Aside>
      //   </MediaQuery>
      // }
      header={
        <Header height={60} p="md">
          <div
            style={{ display: "flex", alignItems: "center", height: "100%" }}
          >
            <MediaQuery largerThan="sm" styles={{ display: "none" }}>
              <Burger
                opened={opened}
                onClick={() => setOpened((o) => !o)}
                size="sm"
                color={theme.colors.gray[6]}
                mr="xl"
              />
            </MediaQuery>
            <Image width={40} height={40} imageProps={logo} />
            <Title
              p="md"
              style={{
                fontSize: "20px",
                fontWeight: "bold",
                color: theme.colors.cyan[3],
              }}
            >
              Classademia
            </Title>

            <div style={{ marginLeft: "auto" }}>
              <NavbarButton text="Logout" onClick={() => {}}>
                <Logout size={30} strokeWidth={1} color={"black"} />
              </NavbarButton>
            </div>
          </div>
        </Header>
      }
    >
      {children}
    </AppShell>
  );
}
