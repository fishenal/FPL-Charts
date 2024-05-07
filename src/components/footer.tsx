import React from "react";
import Link from "next/link";
import Image from "next/image";

export const Footer = () => {
  const navs = [
    {
      label: "Premier League Fantasy",
      path: "https://fantasy.premierleague.com/",
      target: true,
    },
    {
      label: "About",
      path: "/about",
    },
    {
      label: "Help",
      path: "/#help",
    },
    {
      label: "Privacy Policy",
      path: "/privacyPolicySite",
    },
  ];

  return (
    <footer className="border-t py-5 ">
      <div className="max-w-screen-lg mx-auto flex items-center justify-between">
        <h1 className="flex text-lg p-2 gap-2">
          <Image src="/icon.png" width="50" height="60" alt="FPL Charts Icon" />
        </h1>

        <div className="flex flex-col items-end">
          <ul className="flex pl-8 gap-4">
            {navs.map(({ label, path, target }, idx) => (
              <li className="hover:underline hover:text-amber-800" key={idx}>
                <Link href={path} target={target ? "_blank" : "_self"}>
                  {label}.
                </Link>
              </li>
            ))}
          </ul>
          <div className="flex pl-8 gap-4">fishenal@2024</div>
        </div>
      </div>
    </footer>
  );
};
