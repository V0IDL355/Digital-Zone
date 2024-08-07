"use client";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Menubar, MenubarMenu } from "@/components/ui/menubar";
import navigation from "@/components/navigation";
import React from "react";

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
          <CardTitle>Digital Millennium Copyright Act</CardTitle>
        </CardHeader>
        <CardContent>
          All Emulator Games based on this website are “Dumps and demo versions”
          (Created & free shared from the game lover community), it is not an
          official release of the game developer. Please buy game from the
          developer for the best experience. All games on this website are “For
          testing purposes only” (Trial & find bugs to help game developers, to
          help players can rate before deciding to buy game). DigitalZone is
          absolutly legal and contain only links to other sites such as
          (Uptobox, Zippyshare, Go4Up, Sendspace, Up07, 1fichier…), We do not
          host anything (exe,zip,rar,torrent…) on our server. This site, All
          Links , other resources are reproduced from others Public forums &
          blogs & others websites. This Site is in compliance with the Digital
          Millennium Copyright Act (DMCA). If your copyrighted material has been
          posted on site and you want this material removed, please sent your
          notices to digitalzonegamesnews@proton.me We highly ENCOURAGE users to
          BUY the CDs or DVDs of the Videos Games or Anything else they like.
          Please, buy original contents from author or developer site. The
          following elements must be included in your copyright infringement
          claim: • Complete name(s) of the content in question • Post a link to
          the details Post. • Your company name • Personal info • Phone number
        </CardContent>
      </Card>
    </main>
  );
}
