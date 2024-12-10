import React from "react";
import type { Board, Coord } from "./lib/types";
import { initBoard } from "./lib/init";
import { cn } from "./lib/utils";

const SIZE = 9;
const SUBGRID = 3;

const App: React.FC = () => {
  const [board, setBoard] = React.useState<Board>(initBoard(SIZE));
  const [selected, setSelected] = React.useState<Coord | null>(null);

  return (
    <div className="max-w-fit border border-neutral-700">
      {board.map((row, i) => (
        <div className="flex" key={i}>
          {row.map((square, j) => (
            <button
              onClick={() => setSelected({ row: i, col: j })}
              className={cn(
                "h-12 w-12 transition-colors duration-75 ease-in hover:bg-blue-100",
                {
                  "bg-blue-50": selected?.row === i || selected?.col === j,
                  "bg-blue-200 hover:bg-blue-300":
                    selected?.row === i && selected?.col === j,
                  "border-r border-r-neutral-300": j !== SIZE - 1,
                  "border-r border-r-neutral-500":
                    (j + 1) % SUBGRID === 0 && j !== SIZE - 1,
                  "border-b border-b-neutral-300": i !== SIZE - 1,
                  "border-b border-b-neutral-500":
                    (i + 1) % SUBGRID === 0 && i !== SIZE - 1,
                },
              )}
              key={j}
            >
              {square.value}
            </button>
          ))}
        </div>
      ))}
    </div>
  );
};

export default App;
