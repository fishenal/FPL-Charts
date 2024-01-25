"use client";
import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";

export const Nav = () => {
  const pathname = usePathname();
  const navs = [
    {
      label: "Points",
      path: "/points",
    },
    {
      label: "Rank",
      path: "/rank",
    },
    {
      label: "Value",
      path: "/value",
    },
    {
      label: "Picks",
      path: "/picks",
    },
    {
      label: "Player Points",
      path: "/playerPoints",
    },
  ];
  return (
    <ul className="text-sky-800 w-full mt-5">
      {navs.map(({ label, path }, idx) => (
        <li className="mx-2" key={idx}>
          <Link
            href={path}
            className={`py-1 px-2 mt-2 hover:bg-amber-200 w-full block rounded-md ${
              pathname === path ? "bg-amber-200" : ""
            }`}
          >
            {label}
          </Link>
        </li>
      ))}
    </ul>
  );
};
