import axios from "axios";
import React, { useEffect, useState } from "react";
import { BasicInfoRes, PointsItem } from "@/lib/fetch";
import { toast } from "react-toastify";

export interface IFPLData {
  basicInfo: BasicInfoRes;
  historyInfo: PointsItem[];
  updateAt: string;
  userId: string;
  local?: boolean;
}
const lsKey = "fpl-charts-data";

export const useFPLData = (onQuery: boolean, id: string): IFPLData | {} => {
  const [fplData, setFplData] = useState<IFPLData | {}>({});
  useEffect(() => {
    const ls = window.localStorage.getItem(`${lsKey}`);
    if (ls) {
      setFplData({ ...JSON.parse(ls), local: true });
    }
  }, []);

  useEffect(() => {
    const getData = async (id: string) => {
      if (id) {
        const tid = toast.loading("Please wait fetching your Data...");
        const res = await Promise.all([
          axios.get(`/api/fpl/user/${id}`),
          axios.get(`/api/fpl/history/${id}`),
        ]);

        let allPass = true;
        for (let i = 0; i < res.length; i++) {
          if (res[i].status !== 200) {
            toast.error(`Fetch ${id} Failed ${res[i].data.message}`);
            allPass = false;
          }
        }
        if (allPass) {
          const fplData: IFPLData = {
            basicInfo: res[0].data.data,
            historyInfo: res[1].data.data,
            updateAt: new Date().toISOString(),
            userId: id,
          };
          setFplData(fplData);
          window.localStorage.setItem(`${lsKey}`, JSON.stringify(fplData));
        }
        toast.update(tid, {
          render: `Fetch ${id} Success`,
          type: "success",
          isLoading: false,
        });
      }
    };
    if (onQuery) {
      getData(id);
    }
  }, [onQuery, id]);

  return fplData;
};
