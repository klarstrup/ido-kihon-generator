export type Kyu = 10 | 9 | 8 | 7 | 6 | 5 | 4 | 3 | 2 | 1;

export interface KihonBase {
  kyu: Kyu;
  type: "kick" | "strike" | "block" | "stance";
  name: string;
  danishName: string;
}

export interface Kick extends KihonBase {
  type: "kick";
  ura?: boolean;
}
export interface Strike extends KihonBase {
  type: "strike";
  ura?: boolean;
}
export interface Block extends KihonBase {
  type: "block";
  ura?: boolean;
}

export type Movement = Kick | Strike | Block;

export interface Stance extends KihonBase {
  type: "stance";
  angle?: 0 | 45 | 90 | 180;
}

export type Kihon = Kick | Strike | Block | Stance;

export type Turn = [Stance, Block];

export type Cycle =
  | [Stance, Movement]
  | [Stance, Movement, Movement]
  | [Stance, Movement, Movement, Movement]
  | [Stance, Movement, Stance, Movement]
  | [Stance, Movement, Stance, Movement, Stance];

export type Module = [Cycle, Cycle, Cycle];

export type IdoKihon = [Turn, Module, Turn, Module, Turn];
