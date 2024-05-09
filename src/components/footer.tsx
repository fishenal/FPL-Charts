import React from "react";
import Link from "next/link";
import Image from "next/image";
import LocaleSwitcher from "./LocaleSwitcher";
import i18nHelper from "@/i18n";
import { useRouter } from "next/router";

export const Footer = () => {
  const router = useRouter();
  const { locale: activeLocale } = router;
  const navs = [
    {
      label: i18nHelper.t("fplSite"),
      path: "https://fantasy.premierleague.com/",
      target: true,
    },
    {
      label: i18nHelper.t("about"),
      path: "/about",
    },
    {
      label: i18nHelper.t("help"),
      path: "/appHelp",
    },
    {
      label: i18nHelper.t("prpl"),
      path: "/privacyPolicySite",
    },
  ];

  return (
    <footer className="border-t py-5 ">
      <div className="max-w-screen-lg mx-4 lg:mx-auto flex items-center justify-between">
        <h1 className="flex text-lg p-2 gap-2">
          <Image src="/icon.png" width="50" height="60" alt="FPL Charts Icon" />
        </h1>

        <div className="flex flex-col sm:flex-row items-end gap-4">
          <ul className="flex pl-8 gap-4 flex-col sm:flex-row items-end">
            {navs.map(({ label, path, target }, idx) => (
              <li className="hover:underline hover:text-amber-800" key={idx}>
                <Link href={path} target={target ? "_blank" : "_self"}>
                  {label}.
                </Link>
              </li>
            ))}
            <li>fishenal@2024</li>
          </ul>
          <LocaleSwitcher />
        </div>
      </div>
    </footer>
  );
};
