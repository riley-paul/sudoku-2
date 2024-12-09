import React from "react";
import type { Board, Coord } from "./lib/types";
import { initBoard } from "./lib/init";
import { cn } from "./lib/utils";

const App: React.FC = () => {
  const [board, setBoard] = React.useState<Board>(initBoard(9));
  const [selected, setSelected] = React.useState<Coord | null>(null);

  return (
    <div className="max-w-fit border">
      {board.map((row, i) => (
        <div className="flex" key={i}>
          {row.map((square, j) => (
            <button
              onClick={() =>
                setSelected({
                  row: i,
                  col: j,
                })
              }
              className={cn(
                "h-12 w-12 border transition-colors duration-75 ease-in hover:bg-blue-100",
                {
                  "bg-blue-50": selected?.row === i || selected?.col === j,
                  "bg-blue-200 hover:bg-blue-300":
                    selected?.row === i && selected?.col === j,
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
