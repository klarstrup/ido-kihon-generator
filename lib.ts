import { kihon } from "./kihon.ts";
import {
  KihonType,
  type Block,
  type Cycle,
  type IdoKihon,
  type Kyu,
  type Module,
  type Movement,
  type Stance,
  type Turn,
} from "./types.ts";

const sample = <A extends unknown>(array: A[]): A =>
  array[Math.floor(Math.random() * array.length)];

const getMovements = (maxKyu?: Kyu): Movement[] =>
  kihon.filter(
    (move) => move.type !== KihonType.Stance && (!maxKyu || move.kyu >= maxKyu)
  ) as Movement[];
const getStances = (maxKyu?: Kyu) =>
  kihon.filter(
    (move) =>
      move.type === KihonType.Stance &&
      !move.curriculumOnly &&
      (!maxKyu || move.kyu >= maxKyu)
  ) as Stance[];
const getBlocks = (maxKyu?: Kyu): Block[] =>
  kihon.filter(
    (move) => move.type === KihonType.Block && (!maxKyu || move.kyu >= maxKyu)
  ) as Block[];

const getRandomMovement = (maxKyu?: Kyu): Movement =>
  sample(getMovements(maxKyu));
const getRandomStance = (maxKyu?: Kyu): Stance => sample(getStances(maxKyu));
const getRandomBlock = (maxKyu?: Kyu): Block => sample(getBlocks(maxKyu));

const getRandomCycle = (maxKyu?: Kyu, maxComplexity: number = 5): Cycle => {
  const stance = getRandomStance(maxKyu);
  const steps: (Stance | Movement)[] = [stance];

  if (!maxComplexity || maxComplexity < 2) {
    throw new Error("maxComplexity must be at least 2");
  }

  const additionalStepsCount = Math.floor(
    Math.random() * (maxComplexity - 2) + 2
  );
  for (let i = 0; i < additionalStepsCount; i++) {
    const previousStep = steps[steps.length - 1];

    let nextStep: Stance | Movement;
    if (
      previousStep.type != KihonType.Stance &&
      i < additionalStepsCount - 1 &&
      Math.random() < 0.5
    ) {
      nextStep = getRandomStance(maxKyu);
    } else {
      nextStep = getRandomMovement(maxKyu);
    }

    steps.push(nextStep);
  }

  return steps as Cycle;
};

const getRandomModule = (maxKyu?: Kyu, maxComplexity: number = 5) => {
  const cycle = getRandomCycle(maxKyu, maxComplexity);

  return [cycle, cycle, cycle] satisfies Module;
};

const getRandomTurn = (maxKyu?: Kyu) =>
  [getRandomStance(maxKyu), getRandomBlock(maxKyu)] satisfies Turn;

export const getRandomIdoKihon = (maxKyu?: Kyu, maxComplexity: number = 5) => {
  const turn = getRandomTurn(maxKyu);
  const module = getRandomModule(maxKyu, maxComplexity);

  return [turn, module, turn, module, turn] satisfies IdoKihon;
};

const formatTurn = ([stance, block]: Turn): string =>
  `🔀 ${stance.name}: ${block.name}.`;
const formatCycle = (cycle: Cycle): string =>
  "🔄 " +
  cycle
    .map((step, index) => {
      const name = step.name;

      const previousStep = cycle[index - 1];
      if (!previousStep) return name;

      if (previousStep.type === KihonType.Stance) {
        return `: ${name}`;
      }
      if (step.type === KihonType.Stance) {
        return `. ${name}`;
      }

      return ` => ${name}`;
    })
    .join("") +
  ".";

export const formatIdoKihonVerbose = (idoKihon: IdoKihon): string =>
  idoKihon
    .map((turnModule) => {
      if (turnModule.length === 2) return formatTurn(turnModule);

      if (turnModule.length === 3) {
        return turnModule.map((cycle) => formatCycle(cycle)).join("\n");
      }
    })
    .join("\n");

export const formatIdoKihonBrief = (idoKihon: IdoKihon): string =>
  `${formatTurn(idoKihon[0])}\n${formatCycle(idoKihon[1][0])}`;

export const getHighestKyu = (idoKihon: IdoKihon): Kyu => {
  const turnKyu = (idoKihon[0] as Turn).reduce(
    (max, step) => Math.min(max, step.kyu) as Kyu,
    10 as Kyu
  );
  const moduleKyu = (idoKihon[1] as Module)[0].reduce(
    (max, step) => Math.min(max, step.kyu) as Kyu,
    10 as Kyu
  );
  return Math.min(turnKyu, moduleKyu) as Kyu;
};
