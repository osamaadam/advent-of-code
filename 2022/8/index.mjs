import { argv0 } from "process";
import { parseInput } from "../../2023/util/parseInput.mjs";

const lines = await parseInput("input.txt");

const matrix = lines.map((line) => line.split("").map((cell) => +cell));

const DIR = {
  NORTH: [0, -1],
  SOUTH: [0, 1],
  EAST: [1, 0],
  WEST: [-1, 0],
};

/**
 * @param {number} row
 * @param {number} row
 * @returns {boolean}
 */
function isVisible(row, col) {
  const orgElem = matrix[row][col];
  outer: for (const [r, c] of Object.values(DIR)) {
    let nextRow = row + r;
    let nextCol = col + c;
    while (
      nextRow >= 0 &&
      nextRow < matrix.length &&
      nextCol >= 0 &&
      nextCol < matrix[nextRow].length
    ) {
      const curElem = matrix[nextRow][nextCol];
      if (curElem >= orgElem) {
        continue outer;
      }
      nextRow += r;
      nextCol += c;
    }
    return true;
  }

  return false;
}

let visibleCells = 0;

for (let r = 0; r < matrix.length; r++) {
  for (let c = 0; c < matrix[r].length; c++) {
    if (isVisible(r, c)) {
      visibleCells++;
    }
  }
}

console.log(`The solution to part one is: ${visibleCells}`);

/**
 * @param {number} row
 * @param {number} row
 * @returns {number}
 */
function getScenicScore(row, col) {
  const orgElem = matrix[row][col];
  const scores = [];
  for (const [r, c] of Object.values(DIR)) {
    let curDirScore = 0;
    let nextRow = row + r;
    let nextCol = col + c;
    while (
      nextRow >= 0 &&
      nextRow < matrix.length &&
      nextCol >= 0 &&
      nextCol < matrix[nextRow].length
    ) {
      curDirScore++;
      if (matrix[nextRow][nextCol] >= orgElem) {
        break;
      }
      nextRow += r;
      nextCol += c;
    }
    if (curDirScore === 0) {
      return 0;
    }
    scores.push(curDirScore);
  }

  return scores.reduce((prev, cur) => prev * cur, 1);
}

let maxScenicScore = 0;
for (let r = 0; r < matrix.length; r++) {
  for (let c = 0; c < matrix[r].length; c++) {
    maxScenicScore = Math.max(maxScenicScore, getScenicScore(r, c));
  }
}

console.log(`The solution to part two is: ${maxScenicScore}`);
