import React, { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useSearchParams } from "next/navigation";
import Image from "next/image";
import { Drawer } from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";

export const Nav = () => {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const [open, setOpen] = useState(false);

  const demo = searchParams?.get("demo");
  const navs = [
    {
      label: "Home",
      path: "/",
    },
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
      label: "Comparison",
      path: "/comparison",
    },
    // {
    //   label: "About",
    //   path: "/about",
    // },
  ];

  const toggleDrawer = (newOpen: boolean) => () => {
    setOpen(newOpen);
  };
  const renderMobileNav = () => {
    return (
      <div className="sm:hidden">
        <div
          className="p-2 pt-4"
          onClick={() => {
            setOpen(!open);
          }}
        >
          <div className="flex text-lg p-2 gap-2">
            <Image
              src="/icon.png"
              width="30"
              height="25"
              alt="FPL Charts Icon"
            />
            FPL Charts
            <div className="ml-auto">
              <MenuIcon />
            </div>
          </div>
        </div>
        <Drawer open={open} onClose={toggleDrawer(false)}>
          <ul className="w-[50vw] mt-5 pb-5">
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
        </Drawer>
      </div>
    );
  };
  const renderFullNav = () => {
    return (
      <div className="border-b hidden sm:block">
        <header className="flex flex-row py-4 justify-between max-w-screen-lg mx-auto">
          <div className="flex gap-2 items-center">
            <Image
              src="/icon.png"
              width="50"
              height="60"
              alt="FPL Charts Icon"
            />
            <h1 className="text-lg font-bold">FPL Charts</h1>
          </div>
          <nav className="flex flex-row items-center gap-2">
            {navs.map(({ label, path }, idx) => (
              <div className="mx-2" key={idx}>
                <Link
                  href={path + (demo ? "?demo=1" : "")}
                  className={`py-1 px-2 mt-2 hover:bg-amber-200 block rounded-md ${
                    pathname === path ? "bg-amber-200" : ""
                  }`}
                >
                  {label}
                </Link>
              </div>
            ))}
          </nav>
        </header>
      </div>
    );
  };

  return (
    <>
      {renderMobileNav()}
      {renderFullNav()}
    </>
  );
};
