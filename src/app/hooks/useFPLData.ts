import { UserData } from "@/pages/api/fpl/[gid]";
import { StaticData } from "@/pages/api/fpl/staticData";
import axios from "axios";
import React, { useEffect, useState } from "react";

interface IFPLData {
  userData: UserData;
  staticData: StaticData;
}
const lsKey = "fpl-charts-data";

export const useFPLData = (onQuery: boolean, id: string): IFPLData | {} => {
  const [fplData, setFplData] = useState<IFPLData | {}>({});
  const [userData, setUserData] = useState<UserData | {}>({});
  const [staticData, setStaticData] = useState<StaticData | {}>({});
  useEffect(() => {
    const getData = async (id: string) => {
      if (id) {
        const userRes = await axios.get(`/api/fpl/${id}`);
        const staticRes = await axios.get("/api/fpl/staticData");
        console.log("🚀 ~ getData ~ staticRes:", staticRes);
        console.log("🚀 ~ getData ~ userRes:", userRes);
        if (userRes.status === 200 && staticRes.status === 200) {
          const fplData = {
            userData: userRes.data.data,
            staticData: staticRes.data.data,
          };
          setFplData(fplData);
          window.localStorage.setItem(
            `${lsKey}-${id}`,
            JSON.stringify(fplData)
          );
        }
      }
    };
    console.log("🚀 ~ useEffect ~ id:", id);
    if (onQuery) {
      const ls = window.localStorage.getItem(`${lsKey}-${id}`);
      console.log("🚀 ~ useEffect ~ ls:", ls);
      if (ls) {
        setFplData(JSON.parse(ls));
      } else {
        getData(id);
      }
    }
  }, [onQuery, id]);

  return fplData;
};
