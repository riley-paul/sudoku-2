import React from "react";
import type { Board, Coord } from "./lib/types";
import { initBoard } from "./lib/init";
import { cn } from "./lib/utils";
import { GRID_SIZE, SUBGRID_SIZE } from "./lib/consts";

const App: React.FC = () => {
  const [board, setBoard] = React.useState<Board>(initBoard(GRID_SIZE));
  const [selected, setSelected] = React.useState<Coord | null>(null);

  return (
    <div className="min-w-fit max-w-fit overflow-hidden border border-neutral-700">
      {board.map((row, i) => (
        <div className="flex" key={i}>
          {row.map((square, j) => {
            const coord = { row: i, col: j };
            return (
              <button
                onClick={() => setSelected(coord)}
                className={cn(
                  "size-9 shrink-0 transition-colors duration-75 ease-in hover:bg-blue-100 sm:size-12",
                  {
                    "bg-blue-50":
                      selected &&
                      (selected.row === i ||
                        selected.col === j ||
                        (Math.floor(coord.row / SUBGRID_SIZE) ===
                          Math.floor(selected.row / SUBGRID_SIZE) &&
                          Math.floor(coord.col / SUBGRID_SIZE) ===
                            Math.floor(selected.col / SUBGRID_SIZE))),
                    "bg-blue-200 hover:bg-blue-300":
                      selected?.row === i && selected?.col === j,
                    "border-r border-r-neutral-300": j !== GRID_SIZE - 1,
                    "border-r border-r-neutral-500":
                      (j + 1) % SUBGRID_SIZE === 0 && j !== GRID_SIZE - 1,
                    "border-b border-b-neutral-300": i !== GRID_SIZE - 1,
                    "border-b border-b-neutral-500":
                      (i + 1) % SUBGRID_SIZE === 0 && i !== GRID_SIZE - 1,
                  },
                )}
                key={j}
              >
                {square.value}
              </button>
            );
          })}
        </div>
      ))}
    </div>
  );
};

export default App;
