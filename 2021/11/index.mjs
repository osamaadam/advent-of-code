import { parseInput } from "../../2023/util/parseInput.mjs";

const line = await parseInput("input.txt");

const matrix = line.map((row) => row.split("").map((elem) => Number(elem)));

function incrementAll() {
  for (let r = 0; r < matrix.length; r++) {
    for (let c = 0; c < matrix[r].length; c++) {
      matrix[r][c]++;
    }
  }
}

let flashes = 0;
const visitedSet = new Set();

/**
 * @param {number} row
 * @param {number} col
 */
function updateElement(row, col) {
  const key = `${row},${col}`;
  if (
    row < 0 ||
    col < 0 ||
    row >= matrix.length ||
    col >= matrix[row].length ||
    visitedSet.has(key)
  ) {
    return;
  }

  if (matrix[row][col] < 9) {
    matrix[row][col]++;
    return;
  }

  visitedSet.add(key);
  matrix[row][col] = 0;
  flashes++;

  updateElement(row + 1, col);
  updateElement(row, col + 1);
  updateElement(row - 1, col);
  updateElement(row, col - 1);
  updateElement(row + 1, col + 1);
  updateElement(row + 1, col - 1);
  updateElement(row - 1, col + 1);
  updateElement(row - 1, col - 1);
}

/**
 * @returns {number[] | null}
 */
function findNext() {
  for (let r = 0; r < matrix.length; r++) {
    for (let c = 0; c < matrix[r].length; c++) {
      if (matrix[r][c] > 9) {
        return [r, c];
      }
    }
  }

  return null;
}

/**
 * @param {number} steps
 */
function stepThrough(steps) {
  for (let i = 0; i < steps; i++) {
    visitedSet.clear();
    incrementAll();
    let next = findNext();
    while (next) {
      const [r, c] = next;
      updateElement(r, c);
      next = findNext();
    }
    if (visitedSet.size === matrix.length * matrix[0].length) {
      console.log(`The solution to part two is: ${i + 101}`);
      return;
    }
  }
}

stepThrough(100);
console.log(`The solution to part one is: ${flashes}`);

stepThrough(1_000_000);
