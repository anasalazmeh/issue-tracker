import Link from "next/link";
import React from "react";
import { AiFillBug } from "react-icons/ai";
export const Navbar = () => {
  const link = [
    { label: "Dashbored", href: "/" },
    { label: "Issue", href: "/" },
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
            className="text-zinc-500 hover:text-zinc-800 transition-colors"
          >
            <Link href={link.href}>{link.label}</Link>
          </li>
        ))}
      </ul>
    </nav>
  );
};
