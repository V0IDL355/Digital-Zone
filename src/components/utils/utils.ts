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
  link: string;
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
  downloads: { name: string; link: string }[];
  achievements: boolean;
  dateUpdated: string;
}

export function getImage(str: string) {
  if (str.startsWith("thumbnails"))
    return "https://digitalzone.vercel.app/" + str;
  return str;
}
