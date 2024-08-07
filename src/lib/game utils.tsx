import React from "react";

export function getFormattedSubName(subName: string) {
  return subName
    .split(/ \[ | \+ | & | ] /)
    .map((info, index) => <p key={index}>{info.split(" ").join("\n")}</p>);
}
