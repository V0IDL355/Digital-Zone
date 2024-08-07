import { Game } from "@/lib/types";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Button } from "@/components/ui/button";
import { Clipboard } from "lucide-react";
import Link from "next/link";
import { SiSteam } from "@icons-pack/react-simple-icons";
import React from "react";

export default function gameLinks(game: Game) {
  return (
    <div>
      {game.id && (
        <Popover>
          <PopoverTrigger asChild={true}>
            <Button
              style={{ margin: "0 2px" }}
              variant="outline"
              size="icon"
              onClick={() => {
                navigator.clipboard.writeText(
                  `https://digitalzone.vercel.app/games/${game.id}`,
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
  );
}
