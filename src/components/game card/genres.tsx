import { Game } from "@/lib/types";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import React from "react";

export default function getGenres(game: Game) {
  return (
    game.genres != "" && (
      <div>
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
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
        <Separator style={{ margin: "15px 0" }} />
      </div>
    )
  );
}
