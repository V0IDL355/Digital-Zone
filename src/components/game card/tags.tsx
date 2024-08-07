import { Game } from "@/lib/types";
import { Badge } from "@/components/ui/badge";
import React from "react";

export const tags = [
  {
    value: "gse",
    label: "GoldBerg",
  },
  {
    value: "ofme",
    label: "Online-Fix.me",
  },
  {
    value: "mc",
    label: "Microsoft",
  },
  {
    value: "og",
    label: "Origin",
  },
  {
    value: "unsteam",
    label: "Unsteam",
  },
  {
    value: "steamless",
    label: "Steamless",
  },
  {
    value: "gog",
    label: "GOG",
  },
  {
    value: "drmfree",
    label: "DRM Free",
  },
  {
    value: "switch",
    label: "Switch",
  },
  {
    value: "scene",
    label: "Scene Crack",
  },
  {
    value: "denuvo",
    label: "Denuvo",
  },
  {
    value: "denuvoremoved",
    label: "Denuvo Removed",
  },
  {
    value: "enigmaprotector",
    label: "Enigma Protector",
  },
  {
    value: "steamapicheckbypass",
    label: "SteamAPICheckBypass",
  },
  {
    value: "rune",
    label: "Rune Emu",
  },
  {
    value: "codex",
    label: "Codex Emu",
  },
  {
    value: "epic",
    label: "Epic Games",
  },
];

export default function getTags(game: Game) {
  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
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
