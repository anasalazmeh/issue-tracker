'use client'
import classNames from "classnames";
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
  return (
    <nav className="flex px-5 mb-5 space-x-6 h-14 items-center border-b-2">
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
              'hover:text-zinc-800 transition-colors': true,
            })}
          >
            <Link href={link.href}>{link.label}</Link>
          </li>
        ))}
      </ul>
    </nav>
  );
};
