import { parseInput } from "../util/parseInput.mjs";

const lines = await parseInput("input.txt");

/**
 * @typedef Instruction
 *
 * @property {string} dir
 * @property {number} steps
 * @property {string} hex
 */

/** @type {Instruction[]} */
const instructions = [];

for (const line of lines) {
  const [dir, steps, hex] = line.split(" ");

  instructions.push({
    dir,
    steps: +steps,
    hex: hex.slice(1, -1),
  });
}

/** @type {number[][]} */
const matrix = [[0]];

/**
 * @param {number} row
 * @param {number} col
 * @param {string} hex
 */
function expandMatrix(row, col, hex) {
  if (row >= matrix.length) {
    matrix.push(Array.from({ length: matrix[0].length }, () => 0));
  }
  if (col >= matrix[0].length) {
    for (const r in matrix) {
      matrix[r].push(0);
    }
  }

  console.log({ row, col, hex });
  matrix[row][col] = hex;
}

let cur = [0, 0];

for (const instr of instructions) {
  let delta = [0, 0];
  switch (instr.dir) {
    case "U":
      delta = [-1, 0];
      break;
    case "D":
      delta = [1, 0];
      break;
    case "R":
      delta = [0, 1];
      break;
    case "L":
      delta = [0, -1];
      break;
  }

  const [dr, dc] = delta;
  for (let i = 0; i < instr.steps; i++) {
    cur[0] += dr;
    cur[1] += dc;
    const [row, col] = cur;
    expandMatrix(row, col, 1);
  }
}

/**
 * @param {number} row
 * @param {number} row
 * @returns {boolean}
 */
function isInPolygon(row, col) {
  if (matrix[row][col] === 1) {
    return true;
  }
  let rightHits = 0;

  let [r, c] = [row, col + 1];
  while (c < matrix[r].length) {
    if (matrix[r][c] === 1) {
      if (c - 1 >= 0) {
        if (matrix[r][c - 1] === 1) {
          c++;
          continue;
        }
      }
      rightHits++;
    }
    c++;
  }

  let leftHits = 0;
  [r, c] = [row, col - 1];
  while (c >= 0) {
    if (matrix[r][c] === 1) {
      if (c + 1 < matrix[row].length) {
        if (matrix[r][c + 1] === 1) {
          c--;
          continue;
        }
      }
      leftHits++;
    }
    c--;
  }

  return rightHits > 0 && leftHits > 0 && (leftHits + rightHits) % 2 === 0;
}

let cubicmeters = 0;

function printMatrix() {
  console.log(matrix.map((row) => row.join("")).join("\n"));
}

for (let r = 0; r < matrix.length; r++) {
  for (let c = 0; c < matrix[r].length; c++) {
    if (isInPolygon(r, c)) {
      matrix[r][c] = 1;
      cubicmeters++;
    }
  }
}

console.log(cubicmeters);
