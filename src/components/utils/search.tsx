"use client";
import { Input } from "@/components/ui/input";
import React, { useState } from "react";
import { Game, getImage } from "@/lib/utils";
import { ScrollArea } from "@radix-ui/react-scroll-area";
import { Search } from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

export default function SearchElement(games: Game[]) {
  const [searchResults, setSearchResults] = useState<Game[]>([]);
  const results = searchResults.map((game: Game, i) => {
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
  });
  return (
    <Dialog>
      <DialogTrigger>
        <Button variant="outline">
          <Search className="mr-2 h-4 w-4" /> Search
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle style={{ textAlign: "center" }}>Search</DialogTitle>
          <DialogDescription>
            <Input
              style={{ textAlign: "center" }}
              autoFocus={true}
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  // @ts-ignore
                  const input = e.target.value;

                  const startsWithSearch = games
                    .filter((game) =>
                      game.name
                        .toLowerCase()
                        .split(" ")
                        .some((word) => word.startsWith(input)),
                    )
                    .slice(0, 5);

                  const includesSearch = games
                    .filter((game) =>
                      game.name.toLowerCase().includes(input.toLowerCase()),
                    )
                    .slice(0, 5);

                  setSearchResults(
                    startsWithSearch.length > 0
                      ? startsWithSearch
                      : includesSearch,
                  );
                }
              }}
              placeholder="Search"
            />
            <ScrollArea
              style={{
                marginTop: 10,
                textAlign: "center",
                alignItems: "center",
              }}
              className="h-72 rounded-md border p-4 overflow-auto"
              data-vaul-no-drag
            >
              {results.length > 0 ? (
                results
              ) : (
                <p>No results. Or u didn&apos;t search anything...</p>
              )}
            </ScrollArea>
          </DialogDescription>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
}
