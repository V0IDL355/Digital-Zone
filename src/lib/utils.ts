import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

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
];

export interface Game {
  name: string;
  id: string;
  notes: string;
  subName: string;
  description: string;
  thumbnail: string;
  gameplay: string;
  tags: string[];
  based: {
    info: "csf" | "nfo" | "release" | "basedon" | "info" | string;
    credits: string;
    link: string;
  };
  csrinru: string;
  download: string;
  achievements: boolean;
  dateUpdated: string;
  steamID: string;
  genres: string;
}

export function getImage(str: string) {
  if (str.startsWith("thumbnails"))
    return "https://raw.githubusercontent.com/god0654/games.json/main/" + str;
  return str;
}

export function formatReadableDate(isoString: string): string {
  return new Intl.DateTimeFormat("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
    hour: "numeric",
    minute: "numeric",
    second: "numeric",
  }).format(new Date(isoString));
}

interface Domain {
  label: string;
  value: string;
}

const known_domains: Domain[] = [
  { label: "FileCrypt.cc", value: "filecrypt.cc" },
];

export function extractDomain(url: string): {
  domain: string;
  matchedDomain: Domain;
} {
  const regex = /https?:\/\/([^\/]+)/;
  const match = url.match(regex);
  const domain = match ? match[1] : "";
  const matchedDomain = known_domains.find((dom) => dom.value === domain) || {
    label: "Download",
    value: "download",
  };

  return { domain, matchedDomain };
}
