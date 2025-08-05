import { formatIdoKihonBrief, getHighestKyu, getRandomIdoKihon } from "./lib";

const randomIdoKihon = getRandomIdoKihon();
console.log("Random ido kihon:");
console.log("");
console.log(formatIdoKihonBrief(randomIdoKihon));
console.log("");
console.log("Highest kyu move: " + getHighestKyu(randomIdoKihon));
