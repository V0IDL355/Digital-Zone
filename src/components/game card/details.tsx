import { extractDomain, getImage } from "@/lib/utils";
import { Game } from "@/lib/types";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { SheetDescription } from "@/components/ui/sheet";
import Link from "next/link";
import { Download, Globe } from "lucide-react";
import React from "react";
import { getFormattedSubName } from "@/lib/game utils";

function getGameplay(gameplay: string) {
  const match = gameplay.match(
    /(?:https?:\/\/)?(?:www\.)?(?:youtube\.com\/(?:[^\/\n\s]+\/.*\/|(?:v|e(?:mbed)?)\/|.*[?&]v=)|youtu\.be\/)([a-zA-Z0-9_-]{11})/,
  );
  return match ? "https://www.youtube.com/embed/" + match[1] : gameplay;
}

export default function details(
  game: Game,
  hash?: string,
  handleHash?: Function,
) {
  const text = [
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
  ].find((basedInfo) => basedInfo.infoType == game.based.info)?.text;

  return (
    <Dialog defaultOpen={hash == `#${game.id}`}>
      <DialogTrigger asChild={true}>
        <Button variant="outline">Open Game Details</Button>
      </DialogTrigger>
      <DialogContent
        onCloseAutoFocus={() =>
          handleHash &&
          handleHash("") &&
          history.replaceState(
            null,
            "",
            window.location.pathname + window.location.search,
          )
        }
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
          <DialogDescription asChild={true}>
            <div>{getFormattedSubName(game.subName)}</div>
          </DialogDescription>
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
              src={getGameplay(game.gameplay)}
              allowFullScreen
            />
          </div>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
}
