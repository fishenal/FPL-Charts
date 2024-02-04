import type { NextApiRequest, NextApiResponse } from "next";
export interface ResponseData {
  message?: string;
  data?: any;
}
export interface SimpleLiveData {
  [gw: number]: {
    [element: number]: number; // total_point
  };
}
export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<ResponseData>
) {
  if (req.method === "GET") {
    const { gw } = req.query;
    if (gw) {
      try {
        const data: Record<string, any> = {};
        for (let i = 1; i <= Number(gw); i++) {
          try {
            const { elements } = await import(`@/lib/live/${i}.json`);
            const liveData: SimpleLiveData = {};
            elements.forEach((item: any) => {
              liveData[item.id] = item.stats.total_points;
            });
            data[i] = liveData;
          } catch {
            continue;
          }
        }
        res.status(200).json({
          message: "",
          data,
        });
      } catch (err) {
        res.status(500).json({ message: err as string });
      }
    }
  } else {
    res.status(404);
  }

  res.end();
}
