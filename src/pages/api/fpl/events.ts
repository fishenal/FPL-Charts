import { staticData } from "@/lib/staticData";
import type { NextApiRequest, NextApiResponse } from "next";

interface ResponseData {
  message?: string;
  data?: EventItem[];
}
export type Events = EventItem[];
interface EventItem {
  id: number;
  name: string;
  average_entry_score: number | null;
  highest_score: number | null;
  deadline_time: string;
  chip_plays: {
    chip_name: string;
    num_played: number;
  }[];
  most_selected: number | null;
  most_transferred_in: number | null;
  top_element: number | null;
  top_element_info: {
    id: number;
    points: number;
  } | null;
  transfers_made: number | null;
  most_captained: number | null;
  most_vice_captained: number | null;
  [key: string]: any;
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<ResponseData>
) {
  if (req.method === "GET") {
    res.status(200).json({
      message: "success",
      data: staticData.events,
    });
  }
  res.end();
}
