import axios from "axios";
import { BasicInfoRes } from "./fetch";

export interface SolvedBasicInfo extends BasicInfoRes {
  updateAt: string;
}
export const fetcher = (url: string) => {
  const ls = window.localStorage.getItem(url);
  if (ls) {
    return JSON.parse(ls);
  } else {
    return axios.get(url).then((res) => {
      window.localStorage.setItem(url, JSON.stringify(res.data.data));
    });
  }
};

export const basicInfofetcher = (url: string) => {
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
    });
  }
};
