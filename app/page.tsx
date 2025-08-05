import { formatIdoKihonBrief, getHighestKyu, getRandomIdoKihon } from "../lib";
import type { Kyu } from "../types";

export default async function Page({
  searchParams,
}: {
  searchParams: Promise<{ maxKyu?: string; maxComplexity?: string }>;
}) {
  const { maxKyu, maxComplexity } = await searchParams;

  const randomIdoKihon = getRandomIdoKihon(
    maxKyu ? (parseInt(maxKyu) as Kyu) : undefined,
    maxComplexity ? parseInt(maxComplexity) : undefined
  );
  const formattedIdoKihon = formatIdoKihonBrief(randomIdoKihon);
  const highestKyu = getHighestKyu(randomIdoKihon);

  return (
    <code>
      <h1>Random ido kihon:</h1>
      {formattedIdoKihon.split("\n").map((line, index) => (
        <div key={index}>{line}</div>
      ))}
      <br />
      Highest kyu move: <b>{highestKyu} kyu</b>
    </code>
  );
}
