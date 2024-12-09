export type BoardSquare = {
  value: number | null;
};

export type Board = BoardSquare[][];

export type Coord = {
  row: number;
  col: number;
};
