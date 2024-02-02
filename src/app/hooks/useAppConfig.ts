import { userIdfetcher } from "@/lib/fetcher";
import useSWR from "swr";
const lsKey = "fpl-charts-elements";

interface appConfig {
  id: string;
  setId: (st: string) => void;
}
export const idLsKey = "fpl-charts-id";
export const useAppConfig = (): appConfig => {
  const { data, mutate } = useSWR<string>("userId", userIdfetcher);
  const setId = (id: string) => {
    mutate(() => {
      window.localStorage.setItem(idLsKey, id);
      return id;
    });
  };
  return {
    id: data || "",
    setId,
  };
};
