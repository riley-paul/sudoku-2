import type { Difficulty, Grid } from "./types";

export function isValid(grid: Grid, row: number, col: number, num: number) {
  for (let i = 0; i < 9; i++) {
    // same number in row or column
    if (grid[row][i] === num || grid[i][col] === num) return false;
  }
  const startRow = Math.floor(row / 3) * 3;
  const startCol = Math.floor(col / 3) * 3;

  for (let i = 0; i < 3; i++) {
    for (let j = 0; j < 3; j++) {
      // same number in 3x3 grid
      if (grid[startRow + i][startCol + j] === num) return false;
    }
  }
  return true;
}

export function fillGrid(grid: Grid, row = 0, col = 0) {
  if (row === 9) return true;
  if (col === 9) return fillGrid(grid, row + 1, 0);

  // shuffle numbers 1-9
  const numbers = Array.from({ length: 9 }, (_, i) => i + 1).sort(
    () => Math.random() - 0.5,
  );

  for (const num of numbers) {
    if (isValid(grid, row, col, num)) {
      grid[row][col] = num;
      if (fillGrid(grid, row, col + 1)) return true;
      grid[row][col] = 0;
    }
  }
  return false;
}

export function generateFullGrid() {
  const grid: Grid = Array.from({ length: 9 }, () => Array(9).fill(0));
  fillGrid(grid);
  return grid;
}

export function removeNumbers(grid: Grid, clues = 30) {
  const puzzle = grid.map((row) => [...row]);
  const positions = Array.from({ length: 81 }, (_, i) => [
    Math.floor(i / 9),
    i % 9,
  ]).sort(() => Math.random() - 0.5);

  for (const [row, col] of positions) {
    const temp = puzzle[row][col];
    puzzle[row][col] = 0;

    const copy = puzzle.map((r) => [...r]);
    if (!hasUniqueSolution(copy)) {
      puzzle[row][col] = temp;
    }

    if (puzzle.flat().filter((n) => n !== 0).length <= clues) break;
  }
  return puzzle;
}

export function hasUniqueSolution(grid: Grid) {
  let solutions = 0;

  function solve(grid: Grid, row = 0, col = 0) {
    if (row === 9) {
      solutions++;
      return solutions > 1 ? false : true;
    }
    if (col === 9) return solve(grid, row + 1, 0);
    if (grid[row][col] !== 0) return solve(grid, row, col + 1);

    for (let num = 1; num <= 9; num++) {
      if (isValid(grid, row, col, num)) {
        grid[row][col] = num;
        if (!solve(grid, row, col + 1)) return false;
        grid[row][col] = 0;
      }
    }
    return true;
  }

  return solve(grid);
}

const difficultyLevels: Record<Difficulty, number> = {
  easy: 40,
  medium: 30,
  hard: 22,
};

export function generateSudoku(difficulty: Difficulty = "medium") {
  const clues = difficultyLevels[difficulty];
  const fullGrid = generateFullGrid();
  return removeNumbers(fullGrid, clues);
}

export function printGrid(grid: Grid) {
  const string = grid.map((row) => row.join(" ")).join("\n");
  console.log(string);
}
