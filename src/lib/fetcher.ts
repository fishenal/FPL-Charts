import axios from "axios";
import { BasicInfoRes } from "./fetch";
import { idLsKey } from "@/app/hooks/useAppConfig";
import basicInfo from "./demo/basicInfo";
import elements from "./demo/elements";
import live from "./demo/live";
import picks from "./demo/picks";
import history from "./demo/history";
export interface SolvedBasicInfo extends BasicInfoRes {
  updateAt: string;
}
export const userIdfetcher = (key: string) => {
  if (window.location.search === "?demo") {
    return "5524951";
  }
  const lsId = window.localStorage.getItem(idLsKey);
  if (lsId) {
    return lsId;
  }
  return "";
};
export const fetcher = (url: string) => {
  if (window.location.search === "?demo") {
    if (url.indexOf("elements") > -1) {
      return elements;
    }
    if (url.indexOf("history") > -1) {
      return history;
    }
    if (url.indexOf("live") > -1) {
      return live;
    }
    if (url.indexOf("picks") > -1) {
      return picks;
    }
  }
  const ls = window.localStorage.getItem(url);
  if (ls) {
    return JSON.parse(ls);
  } else {
    return axios.get(url).then((res) => {
      window.localStorage.setItem(url, JSON.stringify(res.data.data));
      return res.data.data;
    });
  }
};

export const basicInfofetcher = (url: string) => {
  if (window.location.search === "?demo") {
    return basicInfo;
  }

  const ls = window.localStorage.getItem(url);
  if (ls) {
    return JSON.parse(ls);
  } else {
    return axios.get(url).then((res) => {
      const solved: SolvedBasicInfo = {
        ...res.data.data,
        updateAt: new Date().toISOString(),
      };
      window.localStorage.setItem(url, JSON.stringify(solved));
      return solved;
    });
  }
};
