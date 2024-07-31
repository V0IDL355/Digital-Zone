"use client";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import React, { useRef, useState } from "react";
import { Separator } from "@/components/ui/separator";
import { Input } from "@/components/ui/input";
import navigation from "@/components/utils/navigation";
import { Menubar, MenubarMenu } from "@/components/ui/menubar";
import { Toggle } from "@/components/ui/toggle";
import { Game, tags } from "@/components/utils/utils";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Medal } from "lucide-react";
import GameElement from "@/components/game";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";

const infoTypes = [
  {
    value: "csf",
    label: "CSF",
  },
  {
    value: "nfo",
    label: "NFO",
  },
  {
    value: "release",
    label: "Release",
  },
  {
    value: "basedon",
    label: "Based On",
  },
  {
    value: "info",
    label: "Info",
  },
];

const knownNFO = [
  "TENOKE",
  "RUNE",
  "TiNYiSO",
  "RazorDOX",
  "I_KnoW",
  "DINOByTES",
  "Unleashed",
  "Razor1911",
  "SKIDROW",
  "FLT",
];

export default function Main() {
  const [name, setName] = useState("");
  const nameInput = useRef(null);

  const [id, setID] = useState("");
  const idInput = useRef(null);

  const [subText, setSubText] = useState("");
  const subTextInput = useRef(null);

  const [description, setDescription] = useState("");
  const descriptionInput = useRef(null);

  const [thumbnail, setThumbnail] = useState("");
  const thumbnailInput = useRef(null);

  const [gameplay, setGameplay] = useState("");
  const gameplayInput = useRef(null);

  const [tag_list, setTags] = useState<string[]>([]);

  const [based_info, setBasedInfo] = useState("");
  const [based_credits, setBasedCredits] = useState("");
  const based_creditsInput = useRef(null);

  const [csrinru, setCsRinRU] = useState("");
  const csrinru_linkInput = useRef(null);

  const [based_link, setBasedLink] = useState("");
  const based_linkInput = useRef(null);

  const [downloadLink, setDownloadLink] = useState("");
  const downloadLinkInput = useRef(null);

  const [achievements, setAchievements] = useState(false);

  const [date, setDate] = useState(new Date().toISOString());

  const [notes, setNotes] = useState("");
  const notesInput = useRef(null);

  const game: Game = {
    name: name,
    id: id.replaceAll(" ", "_"),
    notes: notes,
    subName: subText,
    description: description,
    link: "https://digitalzone.vercel.app/games/#" + id.replaceAll(" ", "_"),
    thumbnail: thumbnail,
    gameplay: gameplay,
    tags: tag_list,
    based: {
      info: based_info,
      credits: based_credits,
      link: based_link,
    },
    csrinru: csrinru,
    downloads: [{ name: "FileCrypt.cc", link: downloadLink }],
    achievements: achievements,
    dateUpdated: date,
  };

  const handlePressedChange = (tag: string, isPressed: boolean) => {
    setTags((prevTags) => {
      return isPressed
        ? prevTags.includes(tag)
          ? prevTags
          : [...prevTags, tag]
        : prevTags.filter((item) => item !== tag);
    });
  };

  const fileInputRef = useRef(null);
  const [gameJsonFile, setGameJsonFile] = React.useState<Game[]>([]);
  const handleJSON = (event: any) => {
    const file = event.target.files[0];
    if (file) {
      if (file.name === "games.json") {
        const reader = new FileReader();
        reader.onload = (e) => {
          if (e.target) {
            const fileContent = e.target.result;
            !!fileContent
              ? setGameJsonFile(JSON.parse(fileContent.toString()))
              : toast.error("games.json is empty!");
          } else {
            toast.error("Error games.json!");
            if (fileInputRef.current) {
              // @ts-ignore
              fileInputRef.current.value = null;
            }
          }
        };
        reader.readAsText(file);
      } else {
        toast.error('Please select a file named "games.json"!');
        if (fileInputRef.current) {
          // @ts-ignore
          fileInputRef.current.value = null;
        }
      }
    }
  };

  function load(game: Game) {
    setName(game.name);
    if (nameInput.current) {
      // @ts-ignore
      nameInput.current.value = game.name;
    }

    setID(game.id);
    if (idInput.current) {
      // @ts-ignore
      idInput.current.value = game.id;
    }

    setSubText(game.subName);
    if (subTextInput.current) {
      // @ts-ignore
      subTextInput.current.value = game.subName;
    }

    setCsRinRU(game.csrinru);
    if (csrinru_linkInput.current) {
      // @ts-ignore
      csrinru_linkInput.current.value = game.csrinru;
    }

    setDescription(game.description);
    if (descriptionInput.current) {
      // @ts-ignore
      descriptionInput.current.value = game.description;
    }

    setThumbnail(game.thumbnail);
    if (thumbnailInput.current) {
      // @ts-ignore
      thumbnailInput.current.value = game.thumbnail;
    }

    setGameplay(game.gameplay);
    if (gameplayInput.current) {
      // @ts-ignore
      gameplayInput.current.value = game.gameplay;
    }

    setTags(game.tags);

    setBasedInfo(game.based.info);

    setBasedCredits(game.based.credits);
    if (based_creditsInput.current) {
      // @ts-ignore
      based_creditsInput.current.value = game.based.credits;
    }

    setBasedLink(game.based.link);
    if (based_linkInput.current) {
      // @ts-ignore
      based_linkInput.current.value = game.based.link;
    }

    setDownloadLink(game.downloads[0].link);
    if (downloadLinkInput.current) {
      // @ts-ignore
      downloadLinkInput.current.value = game.downloads[0].link;
    }

    setAchievements(game.achievements);
  }

  function reset() {
    setName("");
    if (nameInput.current) {
      // @ts-ignore
      nameInput.current.value = "";
    }

    setID("");
    if (idInput.current) {
      // @ts-ignore
      idInput.current.value = "";
    }

    setCsRinRU("");
    if (csrinru_linkInput.current) {
      // @ts-ignore
      csrinru_linkInput.current.value = "";
    }

    setSubText("");
    if (subTextInput.current) {
      // @ts-ignore
      subTextInput.current.value = "";
    }

    setDescription("");
    if (descriptionInput.current) {
      // @ts-ignore
      descriptionInput.current.value = "";
    }

    setThumbnail("");
    if (thumbnailInput.current) {
      // @ts-ignore
      thumbnailInput.current.value = "";
    }

    setGameplay("");
    if (gameplayInput.current) {
      // @ts-ignore
      gameplayInput.current.value = "";
    }

    setTags([]);

    setBasedInfo("");

    setBasedCredits("");
    if (based_creditsInput.current) {
      // @ts-ignore
      based_creditsInput.current.value = "";
    }

    setBasedLink("");
    if (based_linkInput.current) {
      // @ts-ignore
      based_linkInput.current.value = "";
    }

    setDownloadLink("");
    if (downloadLinkInput.current) {
      // @ts-ignore
      downloadLinkInput.current.value = "";
    }

    setAchievements(false);
  }

  const handleLoad = (event: any) => {
    if (event.key === "Enter") {
      const gameName = event.target.value;
      const foundGame = gameJsonFile.find((item) =>
        item.name.toLowerCase().includes(gameName.toLowerCase()),
      );

      if (foundGame) {
        load(foundGame);
        return foundGame;
      } else {
        toast.warning("Game not found!");
        return null;
      }
    }
  };

  const [gamesList, setGamesList] = useState<string[]>([]);

  function handleAddUpdate() {
    setGameJsonFile((prevContent) => {
      const index = prevContent.findIndex((item) => item.id === game.id);
      let updatedContent;
      game.dateUpdated = new Date().toISOString();

      if (index !== -1) {
        updatedContent = [...prevContent];
        updatedContent[index] = game;
      } else {
        updatedContent = [...prevContent, game];
      }

      if (!gamesList.includes(game.name))
        setGamesList([...gamesList, game.name]);

      return updatedContent;
    });
    reset();
  }

  function handleSave() {
    const jsonString = JSON.stringify(gameJsonFile, null, 2);
    const blob = new Blob([jsonString], { type: "application/json" });
    const url = URL.createObjectURL(blob);

    const link = document.createElement("a");
    link.href = url;
    link.download = "games.json";

    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);

    URL.revokeObjectURL(url);
  }

  function checkUrlForNFO(url: string) {
    const nfo = knownNFO.find((nfo) => url.includes(nfo)) || "";
    setBasedInfo("nfo");

    setBasedCredits(nfo);
    if (based_creditsInput.current) {
      // @ts-ignore
      based_creditsInput.current.value = nfo;
    }
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
        <MenubarMenu>{navigation()}</MenubarMenu>
      </Menubar>
      <Card
        style={{
          justifyContent: "center",
          margin: 10,
          textAlign: "center",
          display: "flex",
        }}
      >
        <CardContent>
          <div
            style={{
              margin: 5,
              display: "flex",
              flexWrap: "wrap",
              gap: "1em",
              justifyContent: "center",
            }}
          >
            {GameElement(game, 0)}
            <Card
              className="w-[350px]"
              style={{
                justifyContent: "center",
                textAlign: "center",
                marginTop: 10,
              }}
            >
              <CardHeader>
                <CardTitle>
                  <Input
                    style={{
                      textAlign: "center",
                    }}
                    placeholder={"Name"}
                    onChange={(e) => setName(e.target.value)}
                    ref={nameInput}
                  />
                  <Separator style={{ margin: "15px 0" }} />
                  {tags.map((tag, i) => {
                    return (
                      <Toggle
                        onPressedChange={(isPressed) =>
                          handlePressedChange(tag.value, isPressed)
                        }
                        style={{ margin: 2 }}
                        key={tag.value}
                        pressed={
                          tag_list.find((tag_item) => tag_item === tag.value) !=
                          null
                        }
                        variant="outline"
                      >
                        {tag.label}
                      </Toggle>
                    );
                  })}
                  <Separator style={{ margin: "15px 0" }} />
                  <Input
                    style={{
                      textAlign: "center",
                    }}
                    placeholder={"Description"}
                    onChange={(e) => setDescription(e.target.value)}
                    ref={descriptionInput}
                  />
                </CardTitle>
              </CardHeader>
              <CardFooter
                style={{ textAlign: "center", justifyContent: "center" }}
              >
                <div
                  style={{
                    alignItems: "center",
                    justifyContent: "center",
                    gap: 2,
                    margin: 5,
                  }}
                >
                  <Separator style={{ margin: "15px 0" }} />
                  <Input
                    style={{
                      textAlign: "center",
                    }}
                    placeholder={
                      "Portable V1.0.0 + Build 15084287 & DLCs Included"
                    }
                    onChange={(e) => setSubText(e.target.value)}
                    ref={subTextInput}
                  />
                  <Separator style={{ margin: "15px 0" }} />
                  <Input
                    style={{ marginTop: 5 }}
                    placeholder="Download Link Name"
                    onChange={(e) => {
                      setDownloadLink(e.target.value);
                    }}
                    ref={downloadLinkInput}
                  />
                  <Separator style={{ margin: "15px 0" }} />
                  <Input
                    style={{ marginTop: 5 }}
                    placeholder="ID: Space Prison"
                    onChange={(e) => {
                      e.target.value = e.target.value.replaceAll(" ", "_");
                      setID(e.target.value);
                    }}
                    ref={idInput}
                  />
                </div>
              </CardFooter>
            </Card>
            <Card
              className="w-[350px]"
              style={{
                justifyContent: "center",
                textAlign: "center",
                marginTop: 10,
              }}
            >
              <CardHeader>
                <CardTitle>Extra info</CardTitle>
              </CardHeader>
              <CardContent>
                <Input
                  style={{
                    textAlign: "center",
                  }}
                  placeholder={"Gameplay"}
                  onChange={(e) => setGameplay(e.target.value)}
                  ref={gameplayInput}
                />
                <Separator style={{ margin: "15px 0" }} />
                <Input
                  style={{
                    textAlign: "center",
                  }}
                  placeholder={"Thumbnail"}
                  onChange={(e) => setThumbnail(e.target.value)}
                  ref={thumbnailInput}
                />
                <Separator style={{ margin: "15px 0" }} />
                <Select
                  onValueChange={(e) => {
                    setBasedInfo(e);
                  }}
                  value={based_info}
                >
                  <SelectTrigger style={{ marginTop: 5 }}>
                    <SelectValue placeholder="Info Type" />
                  </SelectTrigger>
                  <SelectContent>
                    {infoTypes.map((infoType) => {
                      return (
                        <SelectItem key={infoType.value} value={infoType.value}>
                          {infoType.label}
                        </SelectItem>
                      );
                    })}
                  </SelectContent>
                </Select>
                <Input
                  style={{ marginTop: 5, textAlign: "center" }}
                  placeholder="Credits, ex: ✧GͥOͣDͫ✧"
                  onChange={(e) => {
                    setBasedCredits(e.target.value);
                  }}
                  ref={based_creditsInput}
                />
                <Input
                  style={{ marginTop: 5, textAlign: "center" }}
                  placeholder="Link to the post"
                  onChange={(e) => {
                    setBasedLink(e.target.value);
                    checkUrlForNFO(e.target.value);
                  }}
                  ref={based_linkInput}
                />
                <Separator style={{ margin: "15px 0" }} />
                <Input
                  style={{ marginTop: 5, textAlign: "center" }}
                  placeholder="CSRINRU link (Optional)"
                  onChange={(e) => {
                    setCsRinRU(e.target.value);
                  }}
                  ref={csrinru_linkInput}
                />
                <Separator style={{ margin: "15px 0" }} />
                <Toggle
                  variant="outline"
                  onPressedChange={(e) => {
                    setAchievements(e);
                  }}
                  pressed={achievements}
                >
                  <Medal className="mr-2 h-4 w-4" />
                  Achievements
                </Toggle>
                <Separator style={{ margin: "15px 0" }} />
                <Input
                  style={{ marginTop: 5, textAlign: "center" }}
                  placeholder="Notes"
                  onChange={(e) => {
                    setNotes(e.target.value);
                  }}
                  ref={notesInput}
                />
              </CardContent>
            </Card>
            <Card
              className="w-[350px]"
              style={{
                justifyContent: "center",
                textAlign: "center",
                marginTop: 10,
              }}
            >
              <CardHeader>
                <CardTitle>Games.json</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid w-full max-w-sm items-center gap-1.5">
                  <Input
                    type="file"
                    accept=".json"
                    onChange={handleJSON}
                    ref={fileInputRef}
                  />
                </div>
                <Input
                  style={{ marginTop: 5, textAlign: "center" }}
                  placeholder="Load game, press enter to load it"
                  onKeyDown={(e) => handleLoad(e)}
                />
                <Button
                  style={{ marginTop: 5 }}
                  variant="outline"
                  onClick={handleAddUpdate}
                >
                  Add or Update game
                </Button>
                <Button
                  style={{ marginTop: 5 }}
                  variant="outline"
                  onClick={handleSave}
                >
                  Download new games.json
                </Button>
                <div
                  style={{
                    display: "flex",
                    justifyContent: "center",
                    textAlign: "center",
                    margin: 10,
                    gap: 5,
                  }}
                >
                  <ScrollArea className="h-1/5 w-1/2% rounded-md border">
                    <div className="p-4 ">
                      <h4 className="mb-4 text-sm font-medium leading-none">
                        Games Added Or Updated
                      </h4>
                      {gamesList.map((game) => (
                        <>
                          <div key={game + "list"} className="text-sm">
                            {game}
                          </div>
                          <Separator style={{ margin: "15px 0" }} />
                        </>
                      ))}
                    </div>
                  </ScrollArea>
                </div>
              </CardContent>
            </Card>
          </div>
        </CardContent>
      </Card>
    </main>
  );
}
