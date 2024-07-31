"use client";

import { Menubar, MenubarMenu } from "@/components/ui/menubar";
import React, { useEffect, useState } from "react";
import navigation from "@/components/utils/navigation";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { AlertCircle, Gamepad2, Heart } from "lucide-react";
import { Separator } from "@/components/ui/separator";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import Link from "next/link";

export default function Home() {
  const [gamesTotal, setGamesTotal] = useState<number>(0);

  useEffect(() => {
    (async () => {
      setGamesTotal(
        (
          await (
            await fetch(
              "https://raw.githubusercontent.com/god0654/games.json/main/games.json",
            )
          ).json()
        ).length,
      );
    })();
  }, []);

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
      <div
        style={{
          display: "flex",
          flexWrap: "wrap",
          justifyContent: "center",
          margin: 5,
          gap: 10,
        }}
      >
        <Card
          style={{
            justifyContent: "center",
            margin: 10,
            textAlign: "center",
          }}
        >
          <CardHeader>
            <CardTitle>DigitalZone ~ Games & News</CardTitle>
            <Separator style={{ margin: "15px 0" }} />
            <div
              style={{
                marginRight: 40,
                marginLeft: 40,
                textWrap: "wrap",
              }}
            >
              <p>
                Welcome to DigitalZone, your definitive resource for digital
                games.
              </p>
              <p>
                Here on DigitalZone, we offer a wide selection of Direct Play
                games designed to give you an unparalleled gaming experience.
              </p>
              <p>
                Explore our collection and discover how quick and easy it can be
                to dive into your next great game.
              </p>
            </div>
          </CardHeader>
          <CardContent>
            <Separator style={{ margin: "15px 0" }} />
            <Card
              style={{
                justifyContent: "center",
                margin: 10,
                textAlign: "center",
              }}
            >
              <CardHeader>
                <div
                  style={{
                    display: "flex",
                    textAlign: "center",
                    justifyContent: "center",
                  }}
                >
                  <Gamepad2 />
                  <CardTitle>Total game amount: {gamesTotal}</CardTitle>
                </div>
              </CardHeader>
            </Card>
            <Separator style={{ margin: "15px 0" }} />
            <Card
              style={{
                justifyContent: "center",
                margin: 10,
                textAlign: "center",
              }}
            >
              <CardHeader>
                <CardTitle>Credits</CardTitle>
              </CardHeader>
              <CardContent>
                <div
                  style={{
                    display: "flex",
                    flexWrap: "wrap",
                    justifyContent: "center",
                    margin: 5,
                    gap: 10,
                  }}
                >
                  <Card>
                    <CardHeader>
                      <div
                        style={{
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                          gap: 5,
                        }}
                      >
                        <CardTitle>✧GͥOͣDͫ✧</CardTitle>
                        <Heart />
                      </div>
                    </CardHeader>
                    <CardContent>Owner and Creator of DigitalZone</CardContent>
                  </Card>
                  <Card>
                    <CardHeader style={{ display: "flex" }}>
                      <div
                        style={{
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                          gap: 5,
                        }}
                      >
                        <CardTitle>VOID️️</CardTitle>
                        <Heart />
                      </div>
                    </CardHeader>
                    <CardContent>Creator of this Site</CardContent>
                  </Card>
                </div>
              </CardContent>
            </Card>{" "}
            <Separator style={{ margin: "15px 0" }} />
            <Alert variant="destructive">
              <AlertCircle className="h-4 w-4" />
              <AlertTitle>Warning!</AlertTitle>
              <AlertDescription>
                Remember read{" "}
                <Link style={{ textDecoration: "underline" }} href="dmca">
                  DMCA
                </Link>{" "}
                section before download.
              </AlertDescription>
            </Alert>
          </CardContent>
        </Card>
      </div>
    </main>
  );
}
