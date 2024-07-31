import type { NextApiRequest, NextApiResponse } from "next";

import generateRssFeed from "@/components/utils/api/rss2";

type ResponseData = {
  message: string;
};

export default async function Rss2(
  req: NextApiRequest,
  res: NextApiResponse<ResponseData>,
) {
  const feed = await generateRssFeed();
  res.status(200);
  res.setHeader("Content-Type", "text/xml");
  res.setHeader("Cache-Control", "public, s-maxage=360");
  res.write(feed.rss2());
  res.end();
}
