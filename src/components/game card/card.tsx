"use client";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Game } from "@/lib/types";
import { formatReadableDate, getImage } from "@/lib/utils";
import { Separator } from "@/components/ui/separator";
import React from "react";
import { getFormattedSubName } from "@/lib/game utils";
import gameLinks from "@/components/game card/links";
import getTags from "@/components/game card/tags";
import getGenres from "@/components/game card/genres";
import details from "@/components/game card/details";

export default function gameCard(
  game: Game,
  i: number,
  hash?: string,
  handleHash?: Function,
) {
  return (
    <Card
      key={game.name + i}
      style={{ justifyContent: "center", textAlign: "center" }}
      id={game.id}
      className="w-[350px]"
    >
      <CardHeader
        style={{
          justifyContent: "center",
          textAlign: "center",
          alignItems: "center",
        }}
      >
        <img
          src={getImage(game.thumbnail)}
          alt={game.name}
          loading="lazy"
          decoding="async"
          style={{
            borderRadius: "5px",
          }}
        />
        <CardTitle>
          {game.name}
          <Separator style={{ margin: "15px 0" }} />
          {getTags(game)}
          <Separator style={{ margin: "15px 0" }} />
          {game.genres && getGenres(game)}
        </CardTitle>
        <CardDescription>{game.description}</CardDescription>
      </CardHeader>
      <CardContent>{details(game, hash, handleHash)}</CardContent>
      <CardFooter style={{ textAlign: "center", justifyContent: "center" }}>
        <div
          style={{
            alignItems: "center",
            justifyContent: "center",
            gap: 2,
            margin: 5,
          }}
        >
          <Separator style={{ margin: "15px 0" }} />
          {getFormattedSubName(game.subName)}
          <Separator style={{ margin: "15px 0" }} />
          <Badge variant="secondary">
            Last updated: {formatReadableDate(game.dateUpdated)}
          </Badge>
          <Separator style={{ margin: "15px 0" }} />
          {gameLinks(game)}
        </div>
      </CardFooter>
    </Card>
  );
}
