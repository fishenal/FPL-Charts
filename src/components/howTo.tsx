import React from "react";
import Link from "next/link";
import Image from "next/image";
import { IdInput } from "./IdInput";
import i18nHelper from "@/i18n";

export const HowTo = () => {
  return (
    <div className="border-t py-5 max-w-screen-lg mx-4 lg:mx-auto " id="help">
      <h1 className="flex text-lg font-bold">{i18nHelper.t("howToUse")}</h1>
      <div className="flex justify-between w-full gap-2 flex-col sm:flex-row ">
        <div className="w-full sm:w-1/3 bg-[#046035] p-4 text-white">
          <h2 className="font-bold">{i18nHelper.t("stepTitle", { n: 1 })}: </h2>
          <div className="text-sm">
            {i18nHelper.t("signIn")}
            <Link
              className="underline"
              href="https://fantasy.premierleague.com/"
              target="_blank"
            >
              {i18nHelper.t("fplSite")}
            </Link>
          </div>
        </div>

        <div className="w-full sm:w-1/3 bg-[#046035] p-4 text-white">
          <h2 className="font-bold">{i18nHelper.t("stepTitle", { n: 2 })}: </h2>
          <div className="text-sm">
            {i18nHelper.t("check.line1")}{" "}
            <span className="break-all">
              {`https://fantasy.premierleague.com/entry/{gameId}/event/XXX`}
            </span>
            {i18nHelper.t("check.line2")}
            <div className="py-3">
              <Image
                src="/indicate.png"
                width={996}
                height={98}
                alt="your GameID from fantasy.premierleague.com url"
              />
            </div>
            <Link
              className="underline"
              href="/privacyPolicySite"
              target="_blank"
            >
              {i18nHelper.t("prpl")}
            </Link>
          </div>
        </div>
        <div className="w-full sm:w-1/3 bg-[#046035] p-4 text-white">
          <h2 className="font-bold">{i18nHelper.t("stepTitle", { n: 3 })}: </h2>
          <div className="mb-2">{i18nHelper.t("copy.line1")}</div>
          <IdInput />
        </div>
      </div>
    </div>
  );
};
