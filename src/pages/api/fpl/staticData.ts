import { staticData } from "@/lib/staticData";
import type { NextApiRequest, NextApiResponse } from "next";

export interface StaticData {
  [k: string]: any;
}
interface ResponseData {
  message?: string;
  data?: StaticData;
}
//fantasy.premierleague.com/api/entry/5524951/
const host = "https://fantasy.premierleague.com";

const fetchStaticData = async () => {
  const res = await fetch(`${host}/api/bootstrap-static`);
  const repo = await res.json();
  return repo;
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<ResponseData>
) {
  if (req.method === "GET") {
    res.status(200).json({
      message: "success",
      data: staticData,
    });
  }
  res.end();
}
