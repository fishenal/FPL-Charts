"use client";
import React, { useEffect } from "react";
import { ChangeEvent, useState } from "react";
import { toast } from "react-toastify";
import { useAppConfig } from "../hooks/useAppConfig";
import { SolvedBasicInfo, basicInfofetcher, checkInDemo } from "@/lib/fetcher";
import useSWR from "swr";
import dayjs from "dayjs";
import { Alert, Button, TextField, Tooltip, Typography } from "@mui/material";
import { GlobalLoading } from "./globalLoading";
import { usePathname } from "next/navigation";
import Image from "next/image";
export const UserInfoHeader = () => {
  const pathname = usePathname();
  const { id, setId } = useAppConfig();
  const [stId, setStId] = useState("");

  const { data: userInfoData, isLoading } = useSWR<SolvedBasicInfo>(
    () => (id ? `/api/fpl/user/${id}` : ""),
    basicInfofetcher
  );

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setStId(e.target.value);
  };

  const handleSearch = () => {
    if (/^\d+$/.test(stId)) {
      setId(stId);
    } else {
      toast.warning("ID need to be numbers");
    }
  };

  const updateId = () => {
    if (/^\d+$/.test(id)) {
      setId(id);
    } else {
      toast.warning("ID need to be numbers");
    }
  };

  const renderDataInfo = () => {
    if (userInfoData) {
      return (
        <div>
          {checkInDemo() && (
            <Alert
              severity="info"
              sx={{
                alignItems: "center",
                marginBottom: 4,
              }}
            >
              This is Demo Mode,{" "}
              <Button
                onClick={() => {
                  window.location.href = "/points";
                }}
              >
                To Normal Mode
              </Button>
            </Alert>
          )}

          <div className="font-semibold text-sm flex sm:text-base">
            Current Data from User {userInfoData.id}
            <Tooltip
              title={
                <div className="p-3 space-y-2">
                  <p>
                    Data from Your Last Search. Saved in Your Browser
                    LocalStorage.
                  </p>
                  <p>Refresh this Data by Re-search.</p>
                </div>
              }
            >
              <span className="cursor-pointer">
                <svg
                  className="w-6 h-6 inline text-gray-400 hover:text-gray-500"
                  aria-hidden="true"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    fillRule="evenodd"
                    d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-8-3a1 1 0 00-.867.5 1 1 0 11-1.731-1A3 3 0 0113 8a3.001 3.001 0 01-2 2.83V11a1 1 0 11-2 0v-1a1 1 0 011-1 1 1 0 100-2zm0 8a1 1 0 100-2 1 1 0 000 2z"
                    clipRule="evenodd"
                  ></path>
                </svg>
              </span>
            </Tooltip>
            <Button
              onClick={updateId}
              variant="outlined"
              sx={{
                marginLeft: 3,
              }}
            >
              Update My Data
            </Button>
          </div>
        </div>
      );
    } else {
      return (
        <div className="font-semibold text-base">
          <div>
            <h2>
              Where is your GameID from{" "}
              <a
                href="https://fantasy.premierleague.com/"
                target="_blank"
                className="underline"
              >
                fantasy.premierleague.com
              </a>
              ?
            </h2>
            <div className="py-3 w-1/2">
              <Image
                src="/indicate.png"
                width={996}
                height={98}
                alt="your GameID from fantasy.premierleague.com url"
              />
            </div>
          </div>
          <div className="flex items-center gap-3">
            <h2>No Available Data, Please Search in Below Input.</h2>
            <Button
              onClick={() => {
                window.location.href = "/points/?demo=1";
              }}
              variant="outlined"
            >
              See Demo Mode
            </Button>
          </div>
        </div>
      );
    }
  };

  const renderBasicInfo = () => {
    if (userInfoData) {
      return (
        <div>
          <p>
            <span className="font-bold">Team Name: </span>
            {userInfoData.name}
          </p>
          <p>
            <span className="font-bold">Player Name: </span>
            {userInfoData.player_first_name} {userInfoData.player_last_name}
          </p>
          <p>
            <span className="font-bold">Region:</span>{" "}
            {userInfoData.player_region_name}
          </p>
          <p>
            <span className="font-bold">Overall Points:</span>{" "}
            {userInfoData.summary_overall_points}
          </p>
          <p>
            <span className="font-bold">Overall Rank: </span>
            {userInfoData.summary_overall_rank}
          </p>
          <p>
            <span className="font-bold">UpdateTime: </span>
            {dayjs(userInfoData.updateAt).format()}
          </p>
          <p>
            <span className="font-bold">Until GW: </span>
            {userInfoData.current_event}
          </p>
        </div>
      );
    }
    return null;
  };
  if (pathname && pathname?.indexOf("about") > -1) {
    return null;
  }
  return (
    <div className="flex items-start flex-col gap-4 border-solid border-b border-neutral-100 py-5 w-full">
      {renderDataInfo()}
      {renderBasicInfo()}
      <div className="flex gap-2">
        <TextField
          label="Please Enter GameID"
          variant="outlined"
          onChange={handleChange}
          value={stId}
        />
        <Button
          onClick={handleSearch}
          variant="outlined"
          // className="bg-amber-500 hover:bg-amber-400"
        >
          Search
        </Button>
      </div>
      <GlobalLoading isLoading={isLoading} />
    </div>
  );
};
