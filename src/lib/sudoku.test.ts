import {
  generateFullGrid,
  removeNumbers,
  hasUniqueSolution,
  generateSudoku,
  printGrid,
} from "./sudoku";
import { test, expect, describe } from "vitest";
import type { Difficulty } from "./types";

describe("Sudoku Generator", () => {
  test("generateFullGrid() should create a valid filled Sudoku grid", () => {
    const grid = generateFullGrid();

    expect(grid.length).toBe(9);
    expect(grid.every((row) => row.length === 9)).toBe(true);

    // Ensure each row contains unique numbers 1-9
    for (const row of grid) {
      expect(new Set(row).size).toBe(9);
    }

    // Ensure each column contains unique numbers 1-9
    for (let col = 0; col < 9; col++) {
      const column = grid.map((row) => row[col]);
      expect(new Set(column).size).toBe(9);
    }

    // Ensure each 3x3 box contains unique numbers 1-9
    for (let boxRow = 0; boxRow < 3; boxRow++) {
      for (let boxCol = 0; boxCol < 3; boxCol++) {
        const box = [];
        for (let i = 0; i < 3; i++) {
          for (let j = 0; j < 3; j++) {
            box.push(grid[boxRow * 3 + i][boxCol * 3 + j]);
          }
        }
        expect(new Set(box).size).toBe(9);
      }
    }
  });

  test("removeNumbers() should leave the correct number of clues", () => {
    const fullGrid = generateFullGrid();
    const puzzle = removeNumbers(fullGrid, 30);
    const clueCount = puzzle.flat().filter((n) => n !== 0).length;
    expect(clueCount).toBeGreaterThanOrEqual(30);
  });

  test("Generated puzzles should have a unique solution", () => {
    const fullGrid = generateFullGrid();
    const puzzle = removeNumbers(fullGrid, 30);
    expect(hasUniqueSolution(puzzle)).toBe(true);
  });

  test("generateSudoku() should create a puzzle with difficulty levels", () => {
    const difficulties: Record<Difficulty, number> = {
      easy: 40,
      medium: 30,
      hard: 22,
    };

    Object.entries(difficulties).forEach(([level, clues]) => {
      const puzzle = generateSudoku(level as Difficulty);
      const clueCount = puzzle.flat().filter((n) => n !== 0).length;
      expect(clueCount).toBeGreaterThanOrEqual(clues);
    });
  });
});
