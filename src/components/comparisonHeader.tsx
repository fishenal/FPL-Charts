import React, { useEffect } from "react";
import { ChangeEvent, useState } from "react";
import { basicInfofetcher } from "@/lib/fetcher";
import { Chip, CircularProgress, Divider } from "@mui/material";
import { CustomButton } from "./Button";
import { EventBus } from "@/utils/eventBus";
import i18nHelper from "@/i18n";
export const comparisonIdKey = "fpl-charts-cpIds";
export interface idsItem {
  name: string;
  id: string;
}
export const ComparisonHeader = ({
  onSearch,
}: {
  onSearch: (ids: idsItem[]) => void;
}) => {
  const [idList, setIdList] = useState<idsItem[]>([]);
  const [stId, setStId] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const initIds = window.localStorage.getItem(comparisonIdKey);
    if (initIds) {
      setIdList(JSON.parse(initIds));
    }
  }, []);
  const handleIdsDelete = (id: string) => {
    const newList = idList.filter((item) => item.id !== id);
    window.localStorage.setItem(comparisonIdKey, JSON.stringify(newList));
    setIdList(newList);
  };

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setStId(e.target.value);
  };
  const handleAdd = () => {
    if (/^\d+$/.test(stId)) {
      if (!idList.find((item) => item.id === stId)) {
        const fetchList = async () => {
          setLoading(true);
          const res = await basicInfofetcher(`/api/fpl/user/${stId}`);
          const name = `${res?.name}/${res?.player_first_name} ${res?.player_last_name} `;
          const list = [
            ...idList,
            {
              name,
              id: stId,
            },
          ];
          window.localStorage.setItem(comparisonIdKey, JSON.stringify(list));
          setIdList(list);
          setLoading(false);
        };
        fetchList();
      } else {
        EventBus.$emit("onMessage", i18nHelper.t("message.inList"));
      }
      setStId("");
    } else {
      EventBus.$emit("onMessage", i18nHelper.t("message.idNumber"));
    }
  };
  const handleSearch = () => {
    onSearch(idList);
  };

  return (
    <div className="flex items-start flex-col gap-4 border-solid border-b border-neutral-100 w-full mb-4">
      <h2 className="font-bold">{i18nHelper.t("cprPlayers")}</h2>
      <div className="flex flex-col gap-4 sm:flex-row">
        {idList.length === 0 && "No Players"}
        {idList.map((item) => (
          <Chip
            label={item.name}
            key={item.id}
            onDelete={() => {
              handleIdsDelete(item.id);
            }}
          />
        ))}
      </div>
      {idList.length > 0 && (
        <CustomButton onClick={handleSearch}>
          {i18nHelper.t("genCprButton")}
        </CustomButton>
      )}
      <Divider className="w-full" />
      <h2 className="font-bold">{i18nHelper.t("cprInfo")}</h2>
      <div className="flex gap-2">
        <input
          placeholder={i18nHelper.t("enterId")}
          className="px-2 focus:outline-amber-200 rounded-md text-sky-900"
          onChange={handleChange}
          value={stId}
        />
        <CustomButton onClick={handleAdd}>
          {loading ? <CircularProgress size={20} /> : i18nHelper.t("add")}
        </CustomButton>
      </div>
      <Divider className="w-full" />
    </div>
  );
};
