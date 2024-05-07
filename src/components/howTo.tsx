import React from "react";
import Link from "next/link";
import Image from "next/image";

export const HowTo = () => {
  return (
    <div className="border-t py-5 max-w-screen-lg mx-auto" id="help">
      <h1 className="flex text-lg font-bold">How to Use</h1>
      <div className="flex justify-between w-full gap-2">
        <div className="w-1/3 bg-[#046035] p-4 text-white">
          <h2 className="font-bold">Step1: </h2>
          <div className="text-sm">
            Sign in on{" "}
            <Link
              className="underline"
              href="https://fantasy.premierleague.com/"
              target="_blank"
            >
              Premier League Fantasy
            </Link>
          </div>
        </div>

        <div className="w-1/3 bg-[#046035] p-4 text-white">
          <h2 className="font-bold">Step2: </h2>
          <div className="text-sm">
            Click <i>Points</i> tab, Check URL like{" "}
            <span className="break-all">
              {`https://fantasy.premierleague.com/entry/{gameId}/event/XXX`}
            </span>
            Paste your gameId.
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
              Privacy Policy
            </Link>
          </div>
        </div>
        <div className="w-1/3 bg-[#046035] p-4 text-white">
          <h2 className="font-bold">Step3: </h2>
          <div>Copy your gameId to here: </div>
        </div>
      </div>
    </div>
  );
};
