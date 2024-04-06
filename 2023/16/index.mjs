import { parseInput } from "../util/parseInput.mjs";

const lines = await parseInput("input.txt");

const matrix = lines.map((line) => line.split(""));

const DIRECTIONS = {
  NORTH: [-1, 0],
  SOUTH: [1, 0],
  EAST: [0, 1],
  WEST: [0, -1],
};

const MIRRORS = {
  "|": {
    EAST: [DIRECTIONS.NORTH, DIRECTIONS.SOUTH],
    WEST: [DIRECTIONS.NORTH, DIRECTIONS.SOUTH],
  },
  "-": {
    NORTH: [DIRECTIONS.EAST, DIRECTIONS.WEST],
    SOUTH: [DIRECTIONS.EAST, DIRECTIONS.WEST],
  },
  "/": {
    NORTH: [DIRECTIONS.EAST],
    SOUTH: [DIRECTIONS.WEST],
    EAST: [DIRECTIONS.NORTH],
    WEST: [DIRECTIONS.SOUTH],
  },
  "\\": {
    NORTH: [DIRECTIONS.WEST],
    SOUTH: [DIRECTIONS.EAST],
    EAST: [DIRECTIONS.SOUTH],
    WEST: [DIRECTIONS.NORTH],
  },
};

const visited = new Set();

/**
 * @param {number[]} pos
 * @param {number[]} dir
 * @param {string[][]} matrix
 * @param {number[][]} illuMatrix
 *
 * @returns {number[][]}
 */
function navigate(pos, dir, matrix, illuMatrix) {
  const [row, col] = [pos[0] + dir[0], pos[1] + dir[1]];
  const key = `${[row, col]},${dir}`;

  if (
    row >= matrix.length ||
    row < 0 ||
    col >= matrix[row].length ||
    col < 0 ||
    visited.has(key)
  ) {
    return illuMatrix;
  }

  visited.add(key);
  illuMatrix[row][col] += 1;

  const curElem = matrix[row][col];
  const curDir = Object.entries(DIRECTIONS).find(
    ([_, [y, x]]) => y === dir[0] && x === dir[1],
  )[0];

  if (curElem in MIRRORS) {
    const nextMoves = MIRRORS[curElem][curDir];
    if (!nextMoves) {
      return navigate([row, col], dir, matrix, illuMatrix);
    }
    for (const move of nextMoves) {
      illuMatrix = navigate([row, col], move, matrix, illuMatrix);
    }
    return illuMatrix;
  }

  return navigate([row, col], dir, matrix, illuMatrix);
}

let illuMatrix = Array.from({ length: matrix.length }, () =>
  Array.from({ length: matrix[0].length }, () => 0),
);

illuMatrix = navigate([0, -1], DIRECTIONS.EAST, matrix, illuMatrix);

/**
 * @param {number[][]} illuMatrix
 * @returns {number}
 */
function calculateIlluminations(illumMatrix) {
  let illuminations = 0;
  for (let row = 0; row < illuMatrix.length; row++) {
    for (let col = 0; col < illuMatrix[row].length; col++) {
      const elem = illuMatrix[row][col];
      if (elem >= 1) {
        illuminations++;
      }
    }
  }
  return illuminations;
}

const partOneSolution = calculateIlluminations(illuMatrix);

console.log(`The solution to part one is: ${partOneSolution}`);

/** @type {number[][]} */
const entryPoints = [];

for (let row = 0; row < matrix.length; row++) {
  entryPoints.push(
    [[row, -1], DIRECTIONS.EAST],
    [[row, matrix.length], DIRECTIONS.WEST],
  );
}

for (let col = 0; col < matrix[0].length; col++) {
  entryPoints.push(
    [[-1, col], DIRECTIONS.SOUTH],
    [[matrix[0].length, col], DIRECTIONS.NORTH],
  );
}

let partTwoSolution = 0;

for (const [pos, dir] of entryPoints) {
  illuMatrix = Array.from({ length: matrix.length }, () =>
    Array.from({ length: matrix[0].length }, () => 0),
  );
  visited.clear();

  partTwoSolution = Math.max(
    partTwoSolution,
    calculateIlluminations(navigate(pos, dir, matrix, illuMatrix)),
  );
}

console.log(`The solution to part two is: ${partTwoSolution}`);
