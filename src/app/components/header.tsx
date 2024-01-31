"use client";
import React, { useEffect } from "react";
import { ChangeEvent, useState } from "react";
import { IFPLData, useFPLData } from "../hooks/useFPLData";
import { toast } from "react-toastify";
import { useAppConfig } from "../hooks/useAppConfig";
import { SolvedBasicInfo, basicInfofetcher, fetcher } from "@/lib/fetcher";
import useSWR, { SWRConfig } from "swr";
export const Header = () => {
  const { id, setId } = useAppConfig();
  const [stId, setStId] = useState("");
  const { data: userInfoData } = useSWR<SolvedBasicInfo>(
    `/api/fpl/user/${id}`,
    basicInfofetcher
  );
  console.log("🚀 ~ Header ~ userInfoData:", userInfoData);
  // console.log("🚀 ~ Header ~ data:", data);
  const [showInfo, setShowInfo] = useState(false);
  // const data = useFPLData(onQuery, id);
  // console.log("🚀 ~ Header ~ data:", data);

  // useEffect(() => {
  //   // setOnQuery(false);
  //   console.log("🚀 ~ Header ~ userInfoData:", userInfoData);
  // }, [userInfoData]);

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setStId(e.target.value);
    // setOnQuery(false);
  };

  const handleSearch = () => {
    // if (/^\d{7}$/.test(id)) {
    setId(stId);
    // setOnQuery(true);
    // } else {
    //   toast.error("Please input validate ID, 7 digit");
    // }
  };

  const renderDataInfo = () => {
    if (userInfoData) {
      return (
        <div>
          <span>
            Current Data from User {userInfoData.id}[Team {userInfoData.name}
            ], Updated at [{userInfoData.updateAt}]
          </span>
          <span
            onMouseEnter={() => {
              setShowInfo(true);
            }}
            onMouseLeave={() => {
              setShowInfo(false);
            }}
            className="relative"
          >
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
            <div
              data-popover
              id="popover-description"
              role="tooltip"
              className={`${
                showInfo ? "" : "opacity-0"
              } left-[-50px] top-[30px] absolute z-10 inline-block text-sm text-gray-500 transition-opacity duration-300 bg-white border border-gray-200 rounded-lg shadow-sm  w-72 dark:bg-gray-800 dark:border-gray-600 dark:text-gray-400`}
            >
              <div className="p-3 space-y-2">
                <p>
                  Data from Your Last Search. Saved in Your Browser
                  LocalStorage.
                </p>
                <p>Refresh this Data by Re-search.</p>
              </div>
            </div>
          </span>
        </div>
      );
    } else {
      return (
        <div>
          <p>
            <span>No Available Data, Please Search in Below Input.</span>
          </p>
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
        </div>
      );
    }
    return null;
  };
  return (
    <div className="flex items-start flex-col gap-4 border-solid border-b border-neutral-100 py-5">
      {renderDataInfo()}
      {renderBasicInfo()}
      <div className="flex gap-2">
        <input
          className="border-solid border border-neutral-300 rounded w-80 h-10 px-2"
          onChange={handleChange}
          placeholder="Please Enter Your gameID"
          value={stId}
        />
        <button
          className="border-solid border border-neutral-300 rounded p-2 bg-amber-200 hover:bg-amber-100"
          onClick={handleSearch}
        >
          Search
        </button>
      </div>
    </div>
  );
};
