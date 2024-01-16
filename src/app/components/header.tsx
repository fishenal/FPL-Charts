"use client";
import React from "react";
import { ChangeEvent, useState } from "react";

import { IFPLData, useFPLData } from "../hooks/useFPLData";
export const Header = () => {
  const [id, setId] = useState("");
  const [onQuery, setOnQuery] = useState(false);
  const data = useFPLData(onQuery, id);

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setId(e.target.value);
    setOnQuery(false);
  };

  const handleSearch = () => {
    if (/^\d{7}$/.test(id)) {
      setOnQuery(true);
    } else {
      alert("Please input validate ID, 7 digit");
    }
  };

  const renderDataInfo = () => {
    if (Object.keys(data).length > 0) {
      const dt: IFPLData = data as IFPLData;
      return (
        <div>
          Current Data from User {dt.userId}/ Team {dt.basicInfo.name}, Updated
          At {dt.updateAt} {dt.local && `(From Local Data)`}{" "}
          <i>Update your data by Re-Search</i>
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
          <p>Team Name: {basicInfo.name}</p>
          <p>
            Player Name: {basicInfo.player_first_name}{" "}
            {basicInfo.player_last_name}
          </p>
          <p>Region: {basicInfo.player_region_name}</p>
          <p>Overall Points: {basicInfo.summary_overall_points}</p>
          <p>Overall Rank: {basicInfo.summary_overall_rank}</p>
        </div>
      );
    }
    return null;
  };
  return (
    <div className="flex justify-center flex-row items-center gap-2 border-b-2 py-5">
      {renderDataInfo()}
      {renderBasicInfo()}
      <input
        className="border-solid border border-slate-300 rounded w-80 h-10 px-2"
        onChange={handleChange}
        placeholder="Please Enter Your gameID"
      />
      <button
        className="border-solid border border-slate-300 rounded p-2"
        onClick={handleSearch}
      >
        Search
      </button>
    </div>
  );
};
