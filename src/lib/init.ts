import type { Board } from "./types";

export const initBoard = (size: number): Board =>
  Array.from({ length: size }, () =>
    Array.from({ length: size }, () => ({ value: null }))
  );
