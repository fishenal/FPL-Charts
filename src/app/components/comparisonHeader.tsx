"use client";
import React, { useEffect } from "react";
import { ChangeEvent, useState } from "react";
import { toast } from "react-toastify";
import { basicInfofetcher } from "@/lib/fetcher";
import { Button, Chip, CircularProgress, TextField } from "@mui/material";
const comparisonIdKey = "fpl-charts-cpIds";
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
        toast.warning("Already in List");
      }
      setStId("");
    } else {
      toast.warning("ID need to be numbers");
    }
  };
  const handleSearch = () => {
    onSearch(idList);
  };

  return (
    <div className="flex items-start flex-col gap-4 border-solid border-b border-neutral-100 py-5 w-full">
      <div>Please Enter GameID than click Add button</div>
      <div className="flex gap-4">
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
        <Button onClick={handleSearch} variant="outlined">
          Search
        </Button>
      )}
      <div className="flex gap-2">
        <TextField
          label="Please Enter GameID than click Add button"
          variant="outlined"
          onChange={handleChange}
          value={stId}
        />
        <Button onClick={handleAdd} variant="outlined">
          {loading ? <CircularProgress /> : "Add"}
        </Button>
      </div>
      {/* <GlobalLoading isLoading={isLoading} /> */}
    </div>
  );
};
