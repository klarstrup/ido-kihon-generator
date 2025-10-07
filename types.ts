export type Kyu = 10 | 9 | 8 | 7 | 6 | 5 | 4 | 3 | 2 | 1;

export enum KihonType {
  Kick = "kick",
  Strike = "strike",
  Block = "block",
  Stance = "stance",
}

export interface KihonBase {
  kyu: Kyu;
  type: `${KihonType}`;
  name: string;
  danishName: string;
  curriculumOnly?: boolean;
}

export enum KihonDirection {
  Mae = "mae",
  Mawashi = "mawashi",
  Ushiro = "ushiro",
  Age = "age",
  Soto = "soto",
  Uchi = "uchi",
  Tobi = "tobi",
  Komi = "komi",
  Sakutso = "sakutso",
  Uraken = "uraken",
  Yoko = "yoko",
  Keage = "keage",
  Oroshi = "oroshi",
}
export enum KihonTarget {
  Jodan = "jodan",
  Chudan = "chudan",
  Gedan = "gedan",
  Kin = "kin",
  Hizo = "hizo",
}
export enum KihonHandWeapon {
  Koken = "koken",
  Shuto = "shuto",
  Shotei = "shotei",
  Hiji = "hiji",
  Tsuki = "tsuki",
}
export enum KihonFeetWeapon {
  // Feet
  Heisoku = "heisoku",
  Chosoku = "chosoku",
  Sokuto = "sokuto",
  Teisoku = "teisoku",
  Kakato = "kakato",
  Hiza = "hiza",
}

export type KihonWeapon = KihonHandWeapon | KihonFeetWeapon;

export interface Kick extends KihonBase {
  type: `${KihonType.Kick}`;
  ura?: boolean;
  direction?: `${KihonDirection}` | `${KihonDirection}`[];
  target?: `${KihonTarget}` | `${KihonTarget}`[];
  weapon?: `${KihonFeetWeapon}`;
}
export interface Strike extends KihonBase {
  type: `${KihonType.Strike}`;
  ura?: boolean;
  direction?: `${KihonDirection}` | `${KihonDirection}`[];
  target?: `${KihonTarget}` | `${KihonTarget}`[];
  weapon?: `${KihonHandWeapon}`;
}
export interface Block extends KihonBase {
  type: `${KihonType.Block}`;
  ura?: boolean;
  direction?: `${KihonDirection}` | `${KihonDirection}`[];
  target?: `${KihonTarget}` | `${KihonTarget}`[];
  weapon?: `${KihonHandWeapon}`;
}

export type Movement = Kick | Strike | Block;

export interface Stance extends KihonBase {
  type: `${KihonType.Stance}`;
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
