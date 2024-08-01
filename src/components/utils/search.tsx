"use client";
import { Input } from "@/components/ui/input";
import React, { useState } from "react";
import { Game, getImage } from "@/lib/utils";
import { ScrollArea } from "@radix-ui/react-scroll-area";
import {
  Drawer,
  DrawerContent,
  DrawerDescription,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "../ui/drawer";
import { Search } from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";

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
                    <Link
                      href={"#" + game.id}
                      target="_blank"
                      rel="noopener noreferrer"
                      key={game.name + i + i}
                    >
                      <img
                        src={getImage(game.thumbnail)}
                        alt={game.name}
                        loading="lazy"
                        decoding="async"
                        style={{
                          margin: 5,
                          borderRadius: 5,
                        }}
                      />
                    </Link>
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
