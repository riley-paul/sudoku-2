import React from "react";
import type { Board, Coord } from "./lib/types";
import { initBoard } from "./lib/init";
import { cn } from "./lib/utils";
import { GRID_SIZE, SUBGRID_SIZE } from "./lib/consts";
import { useEventListener } from "usehooks-ts";
import Grid from "./components/grid";

const App: React.FC = () => {
  const [board, setBoard] = React.useState<Board>(initBoard(GRID_SIZE));
  const [selected, setSelected] = React.useState<Coord | null>(null);

  useEventListener("keydown", (e) => {
    if (!selected) return;
    if (e.key === "Backspace") {
      setBoard((board) => {
        const newBoard = [...board];
        newBoard[selected.row][selected.col] = { value: null };
        return newBoard;
      });
    } else if (e.key.match(/[1-9]/)) {
      setBoard((board) => {
        const newBoard = [...board];
        newBoard[selected.row][selected.col] = {
          value: parseInt(e.key),
        };
        return newBoard;
      });
    }
  });

  return <Grid />;
};

export default App;
