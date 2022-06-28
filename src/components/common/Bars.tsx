import React, { ReactNode, useState } from "react";
import Image from "next/image";
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
  Title,
  Badge,
} from "@mantine/core";
import { roleChangesForHeader } from "../roleChanges";
import { User } from "../../../lib/common/types";
import ComposedButton, { NavbarButton } from "./Button";
import Link from "next/link";
export default function AppShellWithRole({
  children,
  user,
  extraType
}: {
  children: ReactNode;
  user: User;
  extraType?: string
}) {
  const theme = useMantineTheme();
  console.log({ user });
  const buttonsForSidebar = roleChangesForHeader({user:user, extraType:extraType});
  console.log(buttonsForSidebar);
  const [opened, setOpened] = useState(false);
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
          {buttonsForSidebar.map((but, index) => (
            <NavbarButton
              text={but.name}
              href={but.href}
              key={index}
            />
          ))}
          <NavbarButton text="Edit account" href={""} />
          <Link href={"/sign-in"} passHref>
            <ComposedButton
              text="Logout"
              style={{ mt: "auto" }}
              onClick={() => {
                localStorage.removeItem("token");
                console.log("token removed");
                console.log(localStorage.getItem("token"));
              }}
            />
          </Link>
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
            <Image width={40} height={40} src={"/idea.png"} />
            <Text
              p="md"
              variant="gradient"
              gradient={{ from: "indigo", to: "cyan", deg: 40 }}
              style={{
                fontSize: "20px",
                fontWeight: "bold",
              }}
            >
              Classademia
            </Text>

            <div style={{ marginLeft: "auto" }}>
              <Badge color="cyan" size="lg" ml="md" variant="dot">
                {user.role}
              </Badge>
            </div>
          </div>
        </Header>
      }
    >
      {children}
    </AppShell>
  );
}
