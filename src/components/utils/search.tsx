"use client";
import {
  Drawer,
  DrawerContent,
  DrawerDescription,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";
import { Button } from "@/components/ui/button";
import { Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import React, { useState } from "react";
import { Game, getImage } from "@/components/utils/utils";
import { ScrollArea } from "@/components/ui/scroll-area";
import Image from "next/image";

const searchGamesByName = (games: Game[], searchTerm: string) => {
  return games
    .filter((game) =>
      game.name.toLowerCase().includes(searchTerm.toLowerCase()),
    )
    .slice(0, 5);
};

export default function SearchElement(games: Game[]) {
  const [searchResults, setSearchResults] = useState<Game[]>([]);
  return (
    <Drawer
      onClose={() => {
        setSearchResults([]);
      }}
    >
      <DrawerTrigger>
        <Button variant="outline">
          <Search className="mr-2 h-4 w-4" /> Search
        </Button>
      </DrawerTrigger>
      <DrawerContent>
        <DrawerHeader>
          <DrawerTitle style={{ textAlign: "center" }}>Search</DrawerTitle>
          <DrawerDescription>
            <Input
              style={{ textAlign: "center" }}
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  // @ts-ignore
                  setSearchResults(searchGamesByName(games, e.target.value));
                }
              }}
              placeholder="Search"
            />
            <ScrollArea
              style={{ marginTop: 10 }}
              className="h-72 rounded-md border p-4"
              data-vaul-no-drag
            >
              <div
                className="p-1"
                style={{
                  display: "flex",
                  flexWrap: "wrap",
                  gap: 2,
                  justifyContent: "center",
                }}
              >
                {searchResults.map((game: Game, i) => {
                  return (
                    <Image
                      key={game.name + i + i}
                      src={getImage(game.thumbnail)}
                      alt={game.name}
                      loading="lazy"
                      decoding="async"
                      width={500}
                      height={300}
                      style={{ margin: 5, borderRadius: 5, cursor: "pointer" }}
                      onClick={() => {
                        window.location.hash = game.id;
                        window.location.reload();
                      }}
                    />
                  );
                })}
              </div>
            </ScrollArea>
          </DrawerDescription>
        </DrawerHeader>
      </DrawerContent>
    </Drawer>
  );
}
