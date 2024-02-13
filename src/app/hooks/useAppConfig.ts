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
  const removeLocal = (id: string) => {
    window.localStorage.removeItem(`/api/fpl/history/${id}`);
    window.localStorage.removeItem(`/api/fpl/user/${id}`);
    window.localStorage.removeItem(`/api/fpl/picks/${id}`);
    window.localStorage.removeItem(idLsKey);
  };
  const setId = (id: string) => {
    removeLocal(id);
    mutate(
      () => {
        window.localStorage.setItem(idLsKey, id);
        return id;
      },
      { revalidate: false }
    );
    window.location.reload();
  };
  return {
    id: data || "",
    setId,
  };
};
