"use client";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  extractDomain,
  formatReadableDate,
  Game,
  getImage,
  tags,
} from "@/lib/utils";
import { Separator } from "@/components/ui/separator";
import React from "react";
import { Clipboard, Download, Globe } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { SheetDescription } from "@/components/ui/sheet";
import Link from "next/link";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { SiSteam } from "@icons-pack/react-simple-icons";

function getBadges(game: Game) {
  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        gap: 2,
        margin: 5,
      }}
    >
      <div>
        {game.tags &&
          game.tags.map((game_tag) => {
            // @ts-ignore
            const result = tags.find((tag) => tag.value == game_tag).label;
            if (result)
              return (
                <Badge key={game_tag} variant="secondary" style={{ margin: 2 }}>
                  {result}
                </Badge>
              );
            return null;
          })}
        {game.achievements && (
          <Badge variant="secondary" style={{ margin: 2 }}>
            Achievements
          </Badge>
        )}
      </div>
    </div>
  );
}

function getGenres(game: Game) {
  return game.genres != "" ? (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        gap: 2,
        margin: 5,
      }}
    >
      <div>
        {game.genres.split(/,\s*|, \s*/).map((genre) => {
          return (
            <Badge key={genre} variant="secondary" style={{ margin: 2 }}>
              {genre}
            </Badge>
          );
        })}
      </div>
    </div>
  ) : null;
}

const pattern =
  /(?:https?:\/\/)?(?:www\.)?(?:youtube\.com\/(?:[^\/\n\s]+\/.*\/|(?:v|e(?:mbed)?)\/|.*[?&]v=)|youtu\.be\/)([a-zA-Z0-9_-]{11})/;

function GameDetails(game: Game, hash?: string, handleHash?: Function) {
  const info = [
    { infoType: "csf", text: `CSF ${game.based.credits}` },
    {
      infoType: "nfo",
      text: `NFO ${game.based.credits}`,
    },
    {
      infoType: "release",
      text: `Release of ${game.based.credits}`,
    },
    { infoType: "basedon", text: `Based on ${game.based.credits} files` },
    {
      infoType: "info",
      text: game.based.credits,
    },
  ];

  const text = info.find(
    (basedInfo) => basedInfo.infoType == game.based.info,
  )?.text;

  const match = game.gameplay.match(pattern);

  const gameplay = match
    ? "https://www.youtube.com/embed/" + match[1]
    : game.gameplay;

  return (
    <Dialog defaultOpen={hash == `#${game.id}`}>
      <DialogTrigger>
        <Button variant="outline">Open Game Details</Button>
      </DialogTrigger>
      <DialogContent
        onCloseAutoFocus={() => {
          if (handleHash) {
            handleHash("");
            if (window.location.hash) {
              history.replaceState(
                null,
                "",
                window.location.pathname + window.location.search,
              );
            }
          }
        }}
        style={{
          justifyContent: "center",
          textAlign: "center",
          overflowY: "auto",
          width: "90vw",
          borderRadius: "5px",
          maxHeight: "90vh",
        }}
      >
        <DialogHeader
          style={{
            justifyContent: "center",
            textAlign: "center",
            justifyItems: "center",
          }}
        >
          <img
            src={getImage(game.thumbnail)}
            alt={game.name}
            loading="lazy"
            decoding="async"
            style={{ borderRadius: "5px" }}
          />
          <DialogTitle>{game.name}</DialogTitle>
          {game.description != "" && (
            <div>
              <Separator style={{ margin: "15px 0" }} />
              <SheetDescription>{game.description}</SheetDescription>
            </div>
          )}
          {game.notes != "" && (
            <div>
              <Separator style={{ margin: "15px 0" }} />
              <SheetDescription>{game.notes}</SheetDescription>
            </div>
          )}
          <Separator style={{ margin: "15px 0" }} />
          <DialogDescription>{game.subName}</DialogDescription>
          <Separator style={{ margin: "15px 0" }} />
          <Link href={game.download}>
            <Button className="w-full" variant="outline">
              <Download className="mr-2 h-4 w-4" />{" "}
              {extractDomain(game.download).matchedDomain.label}
            </Button>
          </Link>
          <Link href={game.based.link}>
            <Button className="w-full" variant="outline">
              {text}
            </Button>
          </Link>
          {game.csrinru != "" && (
            <div>
              <Separator style={{ margin: "15px 0" }} />
              <SheetDescription>
                <Link key={game.name + game.csrinru} href={game.csrinru}>
                  <Button className="w-full" variant="outline">
                    <Globe className="mr-2 h-4 w-4" /> CSRINRU
                  </Button>
                </Link>
              </SheetDescription>
            </div>
          )}
          <Separator style={{ margin: "15px 0" }} />
          <div className="w-full h-full">
            <iframe
              style={{
                minHeight: "20vh",
              }}
              className="w-full h-full"
              src={gameplay}
              allowFullScreen
            />
          </div>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
}

export default function GameElement(
  game: Game,
  i: number,
  hash?: string,
  handleHash?: Function,
) {
  const subName = game.subName
    .split(/ \[ | \+ | & |] /)
    .map((info, index) => <p key={index}>{info.split(" ").join("\n")}</p>);

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
          {getBadges(game)}
          <Separator style={{ margin: "15px 0" }} />
          {game.genres && getGenres(game)}
          {game.genres && <Separator style={{ margin: "15px 0" }} />}
        </CardTitle>
        <CardDescription>{game.description}</CardDescription>
      </CardHeader>
      <CardContent>{GameDetails(game, hash, handleHash)}</CardContent>
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
          {subName}
          <Separator style={{ margin: "15px 0" }} />
          <Badge variant="secondary">
            Last updated: {formatReadableDate(game.dateUpdated)}
          </Badge>
          <Separator style={{ margin: "15px 0" }} />
          <div>
            {game.id && (
              <Popover>
                <PopoverTrigger>
                  <Button
                    style={{ margin: "0 2px" }}
                    variant="outline"
                    size="icon"
                    onClick={() => {
                      navigator.clipboard.writeText(
                        `https://digitalzone.vercel.app/api/embed?game=${game.id}`,
                      );
                    }}
                  >
                    <Clipboard className="h-4 w-4" />
                  </Button>
                </PopoverTrigger>
                <PopoverContent style={{ textAlign: "center", width: "auto" }}>
                  Copied!
                </PopoverContent>
              </Popover>
            )}

            {game.steamID && (
              <Link
                style={{ margin: "0 2px" }}
                href={"https://store.steampowered.com/app/" + game.steamID}
                target="_blank"
                rel="noopener noreferrer"
              >
                <Button variant="outline" size="icon">
                  <SiSteam className="h-4 w-4" />
                </Button>
              </Link>
            )}
          </div>
        </div>
      </CardFooter>
    </Card>
  );
}
