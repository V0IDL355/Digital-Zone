import { Metadata } from "next";
import { Game } from "@/lib/types";
import React from "react";
import { notFound } from "next/navigation";
import { getImage } from "@/lib/utils";
import sharp from "sharp";
import Vibrant from "node-vibrant";
import Head from "next/head";
import { Card, CardTitle } from "@/components/ui/card";
import Link from "next/link";
import { Button } from "@/components/ui/button";

type Props = {
  params: { id: string };
  searchParams: { [key: string]: string | string[] | undefined };
};

async function getDominantColor(imageUrl: string | URL | Request) {
  const response = await fetch(imageUrl);
  const data = await response.arrayBuffer();
  const buffer = Buffer.from(data);
  const pngBuffer = await sharp(buffer).toFormat("png").toBuffer();
  const palette = await Vibrant.from(pngBuffer).quality(1).getPalette();
  return palette?.Vibrant?.hex || "#09090b";
}

const response = await (
  await fetch(
    "https://raw.githubusercontent.com/god0654/games.json/main/games.json",
  )
).json();

const sortedGames = response.sort(
  (a: Game, b: Game) =>
    new Date(b.dateUpdated).getTime() - new Date(a.dateUpdated).getTime(),
);

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const game: Game = sortedGames.find((game: Game) => game.id === params.id);

  let dominantColor = await getDominantColor(getImage(game.thumbnail));
  return {
    title: `${game.name} | ${game.subName.toString()}`,
    description: game.description,
    other: { "theme-color": dominantColor },
    openGraph: {
      url: `https://digitalzone.vercel.app/games#${game.id}`,
      images: [
        {
          url: getImage(game.thumbnail),
        },
      ],
    },
  };
}

export default async function Page({ params }: { params: { id: string } }) {
  const game = sortedGames.find((game: Game) => game.id === params.id);

  !game && notFound();

  return (
    <html lang="en">
      <Head>
        <meta
          http-equiv="refresh"
          content={`0; URL=https://digitalzone.vercel.app/games#${game.id}`}
        />
      </Head>
      <body>
        <Card
          style={{
            height: "100vh",
            textAlign: "center",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <CardTitle>
            <Link href={`https://digitalzone.vercel.app/games#${game.id}`}>
              <Button variant="outline">
                <h1 className="font-extrabold">
                  If you are not redirected automatically, click on this.
                </h1>
              </Button>
            </Link>
          </CardTitle>
        </Card>
      </body>
    </html>
  );
}
