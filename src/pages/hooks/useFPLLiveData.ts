import { Elements } from "@/pages/api/fpl/elements";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";

interface ILiveElement {
  id: number;
  points: number;
}
export interface IFPLLiveData {
  live: {
    [gw: string]: ILiveElement[];
  };
  updateAt: string;
  userId: string;
  local?: boolean;
}
const lsKey = "fpl-charts-live-data";

export const useFPLLiveData = (currentGW: number): IFPLLiveData | {} => {
  const [fplLiveData, setFplLiveData] = useState<IFPLLiveData | {}>({});
  useEffect(() => {
    const ls = window.localStorage.getItem(`${lsKey}`);
    const getData = async () => {
      if (currentGW) {
        const tid = toast.loading("Please wait fetching your Data...");
        const res = await axios.get(`/api/fpl/live/${currentGW}`);
        if (res.status === 200) {
          setFplLiveData(res.data.data);
          window.localStorage.setItem(
            `${lsKey}`,
            JSON.stringify(res.data.data)
          );
        }
        toast.update(tid, {
          render: `Fetch Live Data Success`,
          type: "success",
          isLoading: false,
        });
      }
    };
    if (ls) {
      setFplLiveData({ ...JSON.parse(ls), local: true });
    } else {
      getData();
    }
  }, [currentGW]);

  return fplLiveData;
};
