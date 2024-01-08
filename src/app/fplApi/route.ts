// demo mock player api
import { NextRequest, NextResponse } from "next/server";
import { promises as fs } from "fs";

export async function GET(request: NextRequest) {
  //   // For Demo Only
  //   const searchParams = request.nextUrl.searchParams;
  //   const page = searchParams.get("page");
  //   const size = searchParams.get("size");
  //   const team = searchParams.get("team");
  //   if (!page || !size || !team) {
  //     return NextResponse.json({ error: "query error" }, { status: 400 });
  //   }
  //   const file = await fs.readFile(
  //     process.cwd() + "/src/data/squadsData.json",
  //     "utf8"
  //   );
  //   const data = JSON.parse(file);
  //   if (!data[team]) {
  //     return NextResponse.json({ error: "team not found" }, { status: 404 });
  //   }
  //   const list = data[team]
  //     .slice(
  //       Number(page) * Number(size),
  //       Number(page) * Number(size) + Number(size)
  //     )
  //     .map((data: Record<string, string>) => ({
  //       ...data,
  //       id: uuidv4(),
  //     }));
  //   return NextResponse.json({
  //     status: 200,
  //     data: list,
  //     total: data[team].length,
  //   });
}
