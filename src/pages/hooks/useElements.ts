import { Elements } from "@/pages/api/fpl/elements";
import axios from "axios";
import React, { useEffect, useState } from "react";
const lsKey = "fpl-charts-elements";

export const useElements = (): Elements | {} => {
  const [elements, setElements] = useState<Elements | {}>({});
  useEffect(() => {
    const ls = window.localStorage.getItem(`${lsKey}`);
    const getData = async () => {
      const eleRes = await axios.get("/api/fpl/elements");
      if (eleRes.status === 200) {
        setElements(eleRes.data.data);
        window.localStorage.setItem(
          `${lsKey}`,
          JSON.stringify(eleRes.data.data)
        );
      }
    };
    if (ls) {
      setElements({ ...JSON.parse(ls), local: true });
    } else {
      getData();
    }
  }, []);

  return elements;
};
