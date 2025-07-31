export type Kyu = 10 | 9 | 8 | 7 | 6 | 5 | 4 | 3 | 2 | 1;

export enum KihonType {
  Kick = "kick",
  Strike = "strike",
  Block = "block",
  Stance = "stance",
}

export interface KihonBase {
  kyu: Kyu;
  type: KihonType;
  name: string;
  danishName: string;
}

export interface Kick extends KihonBase {
  type: KihonType.Kick;
  ura?: boolean;
}
export interface Strike extends KihonBase {
  type: KihonType.Strike;
  ura?: boolean;
}
export interface Block extends KihonBase {
  type: KihonType.Block;
  ura?: boolean;
}

export type Movement = Kick | Strike | Block;

export interface Stance extends KihonBase {
  type: KihonType.Stance;
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
