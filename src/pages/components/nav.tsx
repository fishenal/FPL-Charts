import React, { useState } from "react";
import Link from "next/link";
import { styled } from "@mui/material/styles";
import { usePathname } from "next/navigation";
import { useSearchParams } from "next/navigation";
import Image from "next/image";
import { Collapse, IconButton, IconButtonProps } from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { isMobile } from "react-device-detect";
interface ExpandMoreProps extends IconButtonProps {
  expand: boolean;
}
const ExpandMore = styled((props: ExpandMoreProps) => {
  const { expand, ...other } = props;
  return <IconButton {...other} />;
})(({ theme, expand }) => ({
  transform: !expand ? "rotate(0deg)" : "rotate(180deg)",
  marginLeft: "auto",
  transition: theme.transitions.create("transform", {
    duration: theme.transitions.duration.shortest,
  }),
}));

export const Nav = () => {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const [expandMenu, setExpandMenu] = useState(false);

  const demo = searchParams?.get("demo");
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
      label: "Comparison",
      path: "/comparison",
    },
    {
      label: "Value",
      path: "/value",
    },
    {
      label: "Your Player Stats",
      path: "/picks",
    },
    {
      label: "About",
      path: "/about",
    },
  ];
  const renderNav = () => {
    return (
      <ul className=" w-full mt-5 pb-5">
        {navs.map(({ label, path }, idx) => (
          <li className="mx-2" key={idx}>
            <Link
              href={path + (demo ? "?demo=1" : "")}
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
  return (
    <nav className="">
      <header
        className="p-2 pt-4"
        onClick={() => {
          if (isMobile) {
            setExpandMenu(!expandMenu);
          }
        }}
      >
        <h1 className="flex text-lg p-2 gap-2">
          <Image src="/icon.png" width="30" height="25" alt="FPL Charts Icon" />
          FPL Charts
          {isMobile && (
            <ExpandMore expand={expandMenu}>
              <ExpandMoreIcon />
            </ExpandMore>
          )}
        </h1>
      </header>
      <Collapse in={expandMenu || !isMobile} timeout="auto" unmountOnExit>
        {renderNav()}
      </Collapse>
    </nav>
  );
};
