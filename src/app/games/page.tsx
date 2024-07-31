"use client";

import { Menubar, MenubarMenu } from "@/components/ui/menubar";
import React, { useEffect, useState } from "react";
import navigation from "@/components/utils/navigation";
import SearchElement from "@/components/utils/search";
import { Game } from "@/lib/utils";

import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import { Toggle } from "@/components/ui/toggle";
import { Input } from "@/components/ui/input";
import GameElement from "@/components/game";
import { Button } from "@/components/ui/button";

function splitArrayIntoChunks<T>(array: T[], chunkSize: number): T[][] {
  const result: T[][] = [];
  for (let i = 0; i < array.length; i += chunkSize) {
    result.push(array.slice(i, i + chunkSize));
  }
  return result;
}

export default function Games() {
  const [isSmallScreen, setIsSmallScreen] = React.useState<boolean>(true);
  // eslint-disable-next-line react-hooks/rules-of-hooks
  useEffect(() => {
    setIsSmallScreen(window.innerWidth < 1100);
    const handleResize = () => {
      setIsSmallScreen(window.innerWidth < 1100);
    };
    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  const [games, setGames] = useState([[]]);
  const [sortedGames, setSortedGames] = useState([]);
  const [hash, setHash] = useState("");

  useEffect(() => {
    (async () => {
      const response = await (
        await fetch(
          "https://raw.githubusercontent.com/god0654/games.json/main/games.json",
        )
      ).json();
      const data = response.sort(
        (a: Game, b: Game) =>
          new Date(b.dateUpdated).getTime() - new Date(a.dateUpdated).getTime(),
      );
      setGames(splitArrayIntoChunks(data, window.innerWidth < 1100 ? 10 : 50));
      setSortedGames(data);
    })();
  }, []);

  const [page, setPage] = useState(0);

  useEffect(() => {
    function findPageByGame() {
      return (
        games.findIndex((page: Game[]) =>
          page.find((game: Game) => "#" + game.id === hash),
        ) || 0
      );
    }

    const gameIndex = findPageByGame();

    setPage(gameIndex >= 0 ? gameIndex : 0);
  }, [games]);

  // eslint-disable-next-line react-hooks/exhaustive-deps
  function handleHash(hash: string) {
    setHash(hash);
    if (hash == "" && window.location.hash) {
      history.replaceState(
        null,
        "",
        window.location.pathname + window.location.search,
      );
    }
  }

  useEffect(() => {
    handleHash(location.hash);
  }, [handleHash]);

  function paging() {
    return (
      <Pagination>
        {!isSmallScreen ? (
          <PaginationContent>
            <PaginationItem>
              <PaginationPrevious
                onClick={() => {
                  if (page > 0) {
                    setPage(page - 1);
                  }
                }}
              />
            </PaginationItem>
            {games.slice(0, 11).map((_, i) => {
              return (
                <PaginationItem key={"page" + i}>
                  <Toggle pressed={page == i} onClick={() => setPage(i)}>
                    <PaginationLink>{i}</PaginationLink>
                  </Toggle>
                </PaginationItem>
              );
            })}
            <PaginationItem>
              <PaginationEllipsis />
            </PaginationItem>
            <PaginationItem>
              <Toggle
                pressed={page == games.length - 1}
                onClick={() => setPage(games.length - 1)}
              >
                <PaginationLink>{games.length - 1}</PaginationLink>
              </Toggle>
            </PaginationItem>
            <PaginationItem>
              <PaginationNext
                onClick={() => {
                  if (page < games.length - 1) {
                    setPage(page + 1);
                  }
                }}
              />
            </PaginationItem>
            <PaginationItem>
              <Input
                value={page}
                placeholder={"Page"}
                type="number"
                max={games.length - 1}
                min={0}
                onChange={(e) => setPage(parseInt(e.target.value))}
              ></Input>
            </PaginationItem>
          </PaginationContent>
        ) : (
          <PaginationContent>
            <PaginationItem>
              <Button disabled={true} variant="outline">
                {page} / {games.length - 1}
              </Button>
            </PaginationItem>
            <PaginationItem>
              <Input
                value={page}
                placeholder={"Page"}
                type="number"
                max={games.length - 1}
                min={0}
                onChange={(e) => {
                  if (/^\d*$/.test(e.target.value))
                    if (
                      parseInt(e.target.value) <= games.length - 1 &&
                      parseInt(e.target.value) >= 0
                    )
                      setPage(parseInt(e.target.value));
                    else if (parseInt(e.target.value) > games.length - 1)
                      setPage(games.length - 1);
                    else setPage(0);
                }}
              ></Input>
            </PaginationItem>
          </PaginationContent>
        )}
      </Pagination>
    );
  }

  return (
    <main>
      <Menubar
        style={{
          margin: 5,
          padding: 25,
          justifyContent: "center",
          textAlign: "center",
          position: "sticky",
          top: 0,
          gap: 2,
        }}
      >
        <MenubarMenu>
          {navigation()}
          {SearchElement(sortedGames)}
        </MenubarMenu>
      </Menubar>
      <div>
        {paging()}
        <div
          id="games"
          style={{
            margin: 5,
            display: "flex",
            flexWrap: "wrap",
            gap: "1em",
            justifyContent: "center",
          }}
        >
          {games[page].map((game: Game, i) =>
            GameElement(game, i, hash, handleHash),
          )}
        </div>
        {paging()}
      </div>
    </main>
  );
}
