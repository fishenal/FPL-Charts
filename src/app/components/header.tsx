"use client";
import React from "react";
import { ChangeEvent, useState } from "react";

import { IFPLData, useFPLData } from "../hooks/useFPLData";
export const Header = () => {
  const [id, setId] = useState("");
  const [onQuery, setOnQuery] = useState(false);
  const data = useFPLData(onQuery, id);

  console.log("🚀 ~ Home ~ data:", data);
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
  return (
    <div className="flex justify-center flex-row items-center gap-2 border-b-2 py-5">
      {renderDataInfo()}
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
