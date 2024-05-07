import React, { useState } from "react";
import Link from "next/link";
import { styled } from "@mui/material/styles";
import { usePathname } from "next/navigation";
import { useSearchParams } from "next/navigation";
import Image from "next/image";
import { Collapse, IconButton, IconButtonProps } from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { isMobile } from "react-device-detect";

export const Footer = () => {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const [expandMenu, setExpandMenu] = useState(false);

  const demo = searchParams?.get("demo");
  const navs = [
    {
      label: "Premier League Fantasy",
      path: "https://fantasy.premierleague.com/",
    },
    {
      label: "About",
      path: "/about",
    },
    {
      label: "Privacy Policy",
      path: "/privacyPolicySite",
    },
  ];

  return (
    <footer className="border-t py-5 flex items-center justify-between">
      <div>
        <h1 className="flex text-lg p-2 gap-2">
          <Image src="/icon.png" width="50" height="60" alt="FPL Charts Icon" />
        </h1>
      </div>
      <div className="flex flex-col items-end">
        <ul className="flex pl-8 gap-4">
          {navs.map(({ label, path }, idx) => (
            <li className="hover:underline hover:text-amber-800" key={idx}>
              <Link href={path} target="_blank">
                {label}.
              </Link>
            </li>
          ))}
        </ul>
        <div className="flex pl-8 gap-4">fishenal@2024</div>
      </div>
    </footer>
  );
};
