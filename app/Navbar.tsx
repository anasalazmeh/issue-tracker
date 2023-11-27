"use client";
import { Avatar, Box, DropdownMenu, Text } from "@radix-ui/themes";
import classNames from "classnames";
import { useSession } from "next-auth/react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";
import { AiFillBug } from "react-icons/ai";
export const Navbar = () => {
  const currentPath = usePathname();
  const link = [
    { label: "Dashbored", href: "/" },
    { label: "Issues", href: "/issues/list" },
  ];
  const { status, data } = useSession();
  return (
    <nav className="flex px-5 mb-5 space-x-6 h-14 items-center border-b-2 justify-between">
      <Box className="flex items-center space-x-3">
        <Link href={"/"} className="text-3xl">
          <AiFillBug />
        </Link>
        <ul className="flex space-x-6">
          {link.map((link) => (
            <li
              key={link.href}
              // className="text-zinc-500 hover:text-zinc-800 transition-colors"
              className={classNames({
                "text-zinc-900": link.href == currentPath,
                "text-zinc-500": link.href != currentPath,
                "hover:text-zinc-800 transition-colors": true,
              })}
            >
              <Link href={link.href}>{link.label}</Link>
            </li>
          ))}
        </ul>
      </Box>
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
        {status == "unauthenticated" && (
          <Link href={"/api/auth/signin"}>Login</Link>
        )}
      </Box>
    </nav>
  );
};
