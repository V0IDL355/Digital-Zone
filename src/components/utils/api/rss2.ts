import { Game, getImage } from "@/components/utils/utils";

import { Feed } from "feed";

export default async function generateRssFeed() {
  const response = await (
    await fetch("https://digitalzone.vercel.app/games.json")
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
    favicon: "https://digitalzone.vercel.app/icon.png",
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
