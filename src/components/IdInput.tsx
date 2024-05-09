import React from "react";
import { ChangeEvent, useState } from "react";
import { useAppConfig } from "../hooks/useAppConfig";
import { CustomButton } from "./Button";
import { EventBus } from "@/utils/eventBus";
import i18nHelper from "@/i18n";

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
      EventBus.$emit("onMessage", i18nHelper.t("message.idNumber"));
    }
  };

  return (
    <>
      <div className="flex gap-2">
        <input
          placeholder={i18nHelper.t("enterId")}
          onChange={handleChange}
          value={stId}
          className="px-2 focus:outline-amber-200 rounded-md text-sky-900"
        />
        <CustomButton onClick={handleSearch}>
          {i18nHelper.t("search")}
        </CustomButton>
      </div>
    </>
  );
};
