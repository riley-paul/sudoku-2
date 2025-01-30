export type BoardSquare = {
  value: number | null;
};

export type Board = BoardSquare[][];

export type Coord = {
  row: number;
  col: number;
};

export type Difficulty = "easy" | "medium" | "hard";
export type Grid = number[][];
