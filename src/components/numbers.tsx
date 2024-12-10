import { GRID_SIZE } from "@/lib/consts";
import React from "react";
import { Button } from "./ui/button";
import { useStore } from "@/lib/store";

const Numbers: React.FC = () => {
  const { setSquareValue, selected } = useStore();
  return (
    <div className="flex h-full flex-col justify-between gap-1 bg-red-300">
      {Array.from({ length: GRID_SIZE }, (_, i) => (
        <Button
          key={i}
          onClick={() => {
            if (selected) setSquareValue(selected, i + 1);
          }}
          className="size-9 sm:size-10"
        >
          {i + 1}
        </Button>
      ))}
    </div>
  );
};

export default Numbers;
