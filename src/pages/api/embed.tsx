import type { NextApiRequest, NextApiResponse } from "next";
import { Game, getImage } from "@/lib/utils";
import Vibrant from "node-vibrant";
import sharp from "sharp";

type ResponseData = {
  message: string;
};

async function getDominantColor(imageUrl: string | URL | Request) {
  const response = await fetch(imageUrl);
  const data = await response.arrayBuffer();
  const buffer = Buffer.from(data);
  const pngBuffer = await sharp(buffer).toFormat("png").toBuffer();
  const palette = await Vibrant.from(pngBuffer).quality(1).getPalette();
  return palette?.Vibrant?.hex || "#09090b";
}

export default async function Embed(
  req: NextApiRequest,
  res: NextApiResponse<ResponseData>,
) {
  const response = await (
    await fetch(
      "https://raw.githubusercontent.com/god0654/games.json/main/games.json",
    )
  ).json();
  const sortedGames = response.sort(
    (a: Game, b: Game) =>
      new Date(b.dateUpdated).getTime() - new Date(a.dateUpdated).getTime(),
  );

  const params = req.query.game;
  if (!params) {
    res.status(400).json({ message: "Invalid or missing 'game' parameter" });
    return;
  }

  const game = sortedGames.find((game: Game) => game.id === params);

  let dominantColor = await getDominantColor(getImage(game.thumbnail));
  res.status(200);
  res.setHeader("Content-Type", "text/html");
  res.setHeader("Cache-Control", "public, s-maxage=360");
  res.write(`
    <html lang="en">
    <head>
      <title>${game.name} | ${game.subName.toString()}</title>
      <meta http-equiv="refresh" content="0; URL=${game.link}"/>
  <meta content="${game.link}" property="og:url"/>
  <meta content="${dominantColor}" data-react-helmet="true" name="theme-color"/>
  <meta
      content="${getImage(game.thumbnail)}"
      property="og:image"
  />
  <meta name="description" content="${game.description}">
    </head>
    <body>
    <p>If you are not redirected automatically, follow this <a href="${game.link}">link to the destination</a>.</p>
    </body>
    </html>
    `);
  res.end();
}
