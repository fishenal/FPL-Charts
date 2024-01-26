import { Elements } from "@/pages/api/fpl/elements";
import axios from "axios";
import React, { useEffect, useState } from "react";
const lsKey = "fpl-charts-elements";

interface appConfig {
  id: string;
  setId: (st: string) => void;
}
export const useAppConfig = (): appConfig => {
  const [id, setId] = useState("5524951");

  return {
    id,
    setId,
  };
};
