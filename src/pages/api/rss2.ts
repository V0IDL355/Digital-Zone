import type { NextApiRequest, NextApiResponse } from "next";
import { Game, getImage } from "@/lib/utils";
import { Feed } from "feed";

type ResponseData = {
  message: string;
};

async function generateRssFeed() {
  const response = await (
    await fetch(
      "https://raw.githubusercontent.com/god0654/games.json/main/games.json",
    )
  ).json();
  const sortedGames = response.sort(
    (a: Game, b: Game) =>
      new Date(a.dateUpdated).getTime() - new Date(b.dateUpdated).getTime(),
  );

  const feed = new Feed({
    title: "⎝⎝✧GͥOͣDͫ✧⎠⎠",
    description: "DigitalZone Games & News",
    id: "digital_zone",
    link: "https://digitalzone.vercel.app/",
    favicon:
      "https://github.com/god0654/games.json/blob/main/icon.png?raw=true",
    copyright: "DZ",
    generator: "DZ",
    updated: new Date(sortedGames[sortedGames.length - 1].dateUpdated),
  });
  sortedGames.map((game: Game) => {
    feed.addItem({
      title: `${game.name} | ${game.subName}`,
      description: game.description,
      link: game.link,
      date: new Date(game.dateUpdated),
      image: getImage(game.thumbnail),
      guid: game.id,
      content: game.subName,
    });
  });

  return feed;
}

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
