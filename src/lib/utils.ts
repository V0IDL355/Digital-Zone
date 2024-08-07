import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function getImage(str: string) {
  if (!str.startsWith("http"))
    return (
      "https://raw.githubusercontent.com/god0654/games.json/main/thumbnails/" +
      str
    );
  return str;
}

export function formatReadableDate(isoString: string): string {
  const date = new Intl.DateTimeFormat("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
    hour: "numeric",
    minute: "numeric",
    second: "numeric",
  });
  try {
    return date.format(new Date(isoString));
  } catch {
    return isoString;
  }
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
  const match = url ? url.match(regex) : "";
  const domain = match ? match[1] : "";
  const matchedDomain = known_domains.find((dom) => dom.value === domain) || {
    label: "Download",
    value: "download",
  };

  return { domain, matchedDomain };
}
