"use client";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Menubar, MenubarMenu } from "@/components/ui/menubar";
import navigation from "@/components/utils/navigation";
import React from "react";
import { SiGamedeveloper, SiReddit } from "@icons-pack/react-simple-icons";
import Link from "next/link";
import { Button } from "@/components/ui/button";

const Collabs = [
  {
    name: "Game Repack",
    href: "https://game-repack.site/",
    icon: <SiGamedeveloper className="mr-2 h-4 w-4" />,
  },
  {
    name: "RepackWatchers",
    href: "https://www.reddit.com/r/RepackWatchers/",
    icon: <SiReddit className="mr-2 h-4 w-4" />,
  },
];
export default function Main() {
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
        <MenubarMenu>{navigation()}</MenubarMenu>
      </Menubar>
      <Card
        style={{
          justifyContent: "center",
          margin: 10,
          textAlign: "center",
        }}
      >
        <CardHeader>
          <CardTitle>Collabs</CardTitle>
        </CardHeader>
        <CardContent>
          {Collabs.map((collab) => (
            <Link key={collab.name} href={collab.href} passHref>
              <Button variant="outline" style={{ margin: 5 }}>
                {collab.icon} {collab.name}
              </Button>
            </Link>
          ))}
        </CardContent>
      </Card>
    </main>
  );
}
