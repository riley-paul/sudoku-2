import { create } from "zustand";
import { immer } from "zustand/middleware/immer";
import type { Board, Coord } from "./types";
import { initBoard } from "./init";
import { GRID_SIZE } from "./consts";

export enum MoveTypes {
  UP = "UP",
  DOWN = "DOWN",
  LEFT = "LEFT",
  RIGHT = "RIGHT",
}

interface State {
  board: Board;
  selected: Coord | null;
}

interface Actions {
  setSelected: (coord: Coord | null) => void;
  moveSelected: (type: MoveTypes) => void;
  setSquareValue: (coord: Coord, value: number | null) => void;
}

export const useStore = create<State & Actions>()(
  immer((set) => ({
    board: initBoard(GRID_SIZE),
    selected: null,
    setSelected: (selected) => set({ selected }),
    setSquareValue: (coord, value) =>
      set((state) => {
        state.board[coord.row][coord.col] = { value };
      }),
    moveSelected: (type) =>
      set((state) => {
        if (!state.selected) {
          state.selected = { row: 0, col: 0 };
          return;
        }
        switch (type) {
          case MoveTypes.UP:
            state.selected.row = Math.max(state.selected.row - 1, 0);
            break;
          case MoveTypes.DOWN:
            state.selected.row = Math.min(
              state.selected.row + 1,
              GRID_SIZE - 1,
            );
            break;
          case MoveTypes.LEFT:
            state.selected.col = Math.max(state.selected.col - 1, 0);
            break;
          case MoveTypes.RIGHT:
            state.selected.col = Math.min(
              state.selected.col + 1,
              GRID_SIZE - 1,
            );
            break;
        }
      }),
  })),
);
