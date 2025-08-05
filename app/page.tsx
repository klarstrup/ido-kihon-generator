import { getHighestKyu, getRandomIdoKihon } from "../lib";
import {
  Kihon,
  KihonType,
  type Kyu,
  type Movement,
  type Stance,
} from "../types";

function VisualKihons({ kihons }: { kihons: Kihon[] }) {
  let stances: { stance: Stance; length: number }[] = [];
  let movements: Movement[] = [];

  for (const technique of kihons) {
    const lastStance = stances[stances.length - 1];
    if (technique.type === KihonType.Stance) {
      if (lastStance && lastStance.stance === technique) {
        lastStance.length++;
      } else {
        stances.push({ stance: technique, length: 1 });
      }
    } else {
      movements.push(technique);

      if (lastStance && lastStance.length > 0) lastStance.length++;
    }
  }

  return (
    <table style={{ borderCollapse: "collapse", width: "100%" }}>
      <tbody>
        <tr>
          {stances.map((s, i) => (
            <td
              key={i}
              colSpan={s.length}
              style={{
                backgroundColor: "green",
                color: "white",
                padding: "0.25em",
                paddingRight: "0.5em",
                borderLeft: i > 0 ? "2px solid white" : "none",
              }}
            >
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "0.25em",
                }}
              >
                <span>{"👣"}</span>
                <b>{s.stance.name}</b>
              </div>
            </td>
          ))}
        </tr>
        <tr>
          {movements.map((m, i) => (
            <td
              key={i}
              style={{
                backgroundColor: m.type === KihonType.Block ? "blue" : "red",
                color: "white",
                padding: "0.25em",
                paddingRight: "0.5em",
                borderLeft: i > 0 ? "2px solid white" : "none",
              }}
            >
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "0.25em",
                }}
              >
                <span>
                  {m.type === KihonType.Block
                    ? "✋"
                    : m.type === KihonType.Kick
                    ? "🦶"
                    : "👊"}
                </span>
                <span>{m.name}</span>
              </div>
            </td>
          ))}
        </tr>
      </tbody>
    </table>
  );
}

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
  const highestKyu = getHighestKyu(randomIdoKihon);

  return (
    <code>
      <h1>Random ido kihon:</h1>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          gap: "0.5em",
          background: "rgb(200, 200, 200)",
        }}
      >
        {randomIdoKihon.map((turnOrModule, i) => {
          if (turnOrModule.length === 2) {
            return <VisualKihons kihons={turnOrModule} key={i} />;
          }
          if (turnOrModule.length === 3) {
            return turnOrModule.map((cycle, i2) => (
              <VisualKihons kihons={cycle} key={i + "-" + i2} />
            ));
          }
        })}
      </div>
      <br />
      Highest kyu move: <b>{highestKyu} kyu</b>
    </code>
  );
}
