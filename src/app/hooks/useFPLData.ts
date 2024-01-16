import { Elements } from "@/pages/api/fpl/elements";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { BasicInfoRes, PointsItem } from "@/lib/fetch";
import { toast } from "react-toastify";

export interface IFPLData {
  basicInfo: BasicInfoRes;
  historyInfo: PointsItem[];
  elements: Elements;
  updateAt: string;
  userId: string;
  local?: boolean;
}
const lsKey = "fpl-charts-data";

export const useFPLData = (onQuery: boolean, id: string): IFPLData | {} => {
  const [fplData, setFplData] = useState<IFPLData | {}>({});
  // const [userData, setUserData] = useState<UserData | {}>({});
  // const [elementData, setElementData] = useState<Elements | {}>({});
  useEffect(() => {
    const getData = async (id: string) => {
      if (id) {
        const userRes = await axios.get(`/api/fpl/user/${id}`);
        const historyRes = await axios.get(`/api/fpl/history/${id}`);
        const elementRes = await axios.get("/api/fpl/elements");
        if (userRes.status === 200 && elementRes.status === 200) {
          const fplData: IFPLData = {
            basicInfo: userRes.data.data,
            historyInfo: historyRes.data.data,
            elements: elementRes.data.data,
            updateAt: new Date().toISOString(),
            userId: id,
          };
          setFplData(fplData);
          toast.success(`Fetch ${id} Success`);
          window.localStorage.setItem(`${lsKey}`, JSON.stringify(fplData));
        }
        toast.error(`Fetch ${id} Failed`);
      }
      toast.error(`No ID input`);
    };
    if (onQuery || id === "") {
      const ls = window.localStorage.getItem(`${lsKey}`);
      if (ls) {
        toast.success(`Get Data From Local Storage Success`);
        setFplData({ ...JSON.parse(ls), local: true });
      } else {
        getData(id);
      }
    }
  }, [onQuery, id]);

  return fplData;
};
