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

export const infoTypes = [
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

export const knownNFO = [
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
  "DOGE",
];
