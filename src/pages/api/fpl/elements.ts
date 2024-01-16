import { staticData } from "@/lib/staticData";
import type { NextApiRequest, NextApiResponse } from "next";

interface ResponseData {
  message?: string;
  data?: Elements;
}
//fantasy.premierleague.com/api/entry/5524951/
const host = "https://fantasy.premierleague.com";

const fetchStaticData = async () => {
  const res = await fetch(`${host}/api/bootstrap-static`);
  const repo = await res.json();
  return repo;
};

interface PlayerItem {
  id: number;
  web_name: string;
  team: string;
  element_types: string;
}
export interface Elements {
  [key: string]: PlayerItem;
}
export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<ResponseData>
) {
  if (req.method === "GET") {
    const elements: Elements = {};
    const teams: Record<string, string> = {};
    const elementType: Record<string, string> = {};
    staticData.element_types.forEach((item) => {
      elementType[item.id] = item.singular_name_short;
    });
    staticData.teams.forEach((item) => {
      teams[item.id] = item.short_name;
    });
    staticData.elements.forEach((item) => {
      elements[item.id] = {
        id: item.id,
        web_name: item.web_name,
        team: teams[item.team],
        element_types: elementType[item.element_type],
      };
    });

    res.status(200).json({
      message: "success",
      data: elements,
    });
  }
  res.end();
}
