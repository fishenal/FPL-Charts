"use client";
import React from "react";
import { ChangeEvent, useState } from "react";

import { IFPLData, useFPLData } from "../hooks/useFPLData";
import { toast } from "react-toastify";
export const Header = () => {
  const [id, setId] = useState("");
  const [onQuery, setOnQuery] = useState(false);
  const [showInfo, setShowInfo] = useState(false);
  const data = useFPLData(onQuery, id);

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setId(e.target.value);
    setOnQuery(false);
  };

  const handleSearch = () => {
    // if (/^\d{7}$/.test(id)) {
    setOnQuery(true);
    // } else {
    //   toast.error("Please input validate ID, 7 digit");
    // }
  };

  const renderDataInfo = () => {
    if (Object.keys(data).length > 0) {
      const dt: IFPLData = data as IFPLData;
      return (
        <div>
          <p>
            <span>
              Current Data from User {dt.userId}[Team {dt.basicInfo.name}],
              Updated at [{dt.updateAt}]
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
                  fill-rule="evenodd"
                  d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-8-3a1 1 0 00-.867.5 1 1 0 11-1.731-1A3 3 0 0113 8a3.001 3.001 0 01-2 2.83V11a1 1 0 11-2 0v-1a1 1 0 011-1 1 1 0 100-2zm0 8a1 1 0 100-2 1 1 0 000 2z"
                  clip-rule="evenodd"
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
          </p>
        </div>
      );
    }
    return null;
  };

  const renderBasicInfo = () => {
    if (Object.keys(data).length > 0) {
      const dt: IFPLData = data as IFPLData;
      const { basicInfo } = dt;
      return (
        <div>
          <p>
            <span className="font-bold">Team Name: </span>
            {basicInfo.name}
          </p>
          <p>
            <span className="font-bold">Player Name: </span>
            {basicInfo.player_first_name} {basicInfo.player_last_name}
          </p>
          <p>
            <span className="font-bold">Region:</span>{" "}
            {basicInfo.player_region_name}
          </p>
          <p>
            <span className="font-bold">Overall Points:</span>{" "}
            {basicInfo.summary_overall_points}
          </p>
          <p>
            <span className="font-bold">Overall Rank: </span>
            {basicInfo.summary_overall_rank}
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
