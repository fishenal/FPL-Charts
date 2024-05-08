import React from "react";
import { ChangeEvent, useState } from "react";
import { useAppConfig } from "../hooks/useAppConfig";
import { CustomButton } from "./Button";
import { EventBus } from "@/utils/eventBus";

export const IdInput = () => {
  const { setId } = useAppConfig();
  const [stId, setStId] = useState("");

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setStId(e.target.value);
  };

  const handleSearch = () => {
    if (/^\d+$/.test(stId)) {
      setId(stId);
    } else {
      EventBus.$emit("onMessage", "ID need to be numbers.");
    }
  };

  return (
    <>
      <div className="flex gap-2">
        <input
          placeholder="Enter FPL gameId"
          onChange={handleChange}
          value={stId}
          className="px-2 focus:outline-amber-200 rounded-md text-sky-900"
        />
        <CustomButton onClick={handleSearch}>Search</CustomButton>
      </div>
    </>
  );
};
