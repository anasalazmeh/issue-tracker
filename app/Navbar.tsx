"use client";
import { Avatar, Box, DropdownMenu, Text } from "@radix-ui/themes";
import classNames from "classnames";
import { useSession } from "next-auth/react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";
import { AiFillBug } from "react-icons/ai";
import { Skeleton } from '@/app/components'
export const Navbar = () => {
  return (
    <nav className="flex px-5 mb-5 space-x-6 h-14 items-center border-b-2 justify-between">
      <Box className="flex items-center space-x-3">
        <Link href={"/"} className="text-3xl">
          <AiFillBug />
        </Link>
        <NavLink/>
      </Box>
      <AuthStatus/>
    </nav>
  );
};
const NavLink = () => {
  const currentPath = usePathname();
  const link = [
    { label: "Dashbored", href: "/" },
    { label: "Issues", href: "/issues/list" },
  ];
  return (
    <ul className="flex space-x-6">
      {link.map((link) => (
        <li
          key={link.href}
          // className="text-zinc-500 hover:text-zinc-800 transition-colors"
          className={classNames({
            "nav-link":true,
            "!text-zinc-900": link.href == currentPath,
          })}
        >
          <Link href={link.href}>{link.label}</Link>
        </li>
      ))}
    </ul>
  );
};

const AuthStatus = () => {
  const { status, data } = useSession();
  if (status == "loading") return <Skeleton width='3rem' className="rounded-full" />;
  if (status == "unauthenticated")
    return <Link className="nav-link" href={"/api/auth/signin"}>Login</Link>;
  return (
    <Box>
      {status == "authenticated" && (
        <DropdownMenu.Root>
          <DropdownMenu.Trigger>
            <Avatar
              src={data.user?.image!}
              fallback="?"
              size="3"
              radius="full"
              className="cursor-pointer"
            />
          </DropdownMenu.Trigger>
          <DropdownMenu.Content>
            <DropdownMenu.Label>{data.user?.email}</DropdownMenu.Label>
            <DropdownMenu.Item className="cursor-pointer">
              <Link href={"/api/auth/signout"}>Log out</Link>
            </DropdownMenu.Item>
          </DropdownMenu.Content>
        </DropdownMenu.Root>
      )}
    </Box>
  );
};
