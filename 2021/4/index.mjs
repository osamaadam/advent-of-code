import { parseInput } from "../../2023/util/parseInput.mjs";

const lines = await parseInput("input.txt");

const seqs = lines.shift().split(",").map(Number);
lines.shift();

let matrix = [];
const matricies = [];

for (const [i, line] of lines.entries()) {
  if (line.length) {
    const row = line
      .split(" ")
      .filter((seg) => seg.trim().length)
      .map(Number);
    matrix.push(row);
  }
  if (i === lines.length - 1 || line === "") {
    matricies.push(matrix);
    matrix = [];
  }
}

let winners = {};

for (const [round, seq] of seqs.entries()) {
  if (Object.keys(winners).length === matricies.length) {
    break;
  }
  for (const [matrixIndex, matrix] of matricies.entries()) {
    if (matrixIndex in winners) {
      continue;
    }
    if (isBingo(matrix, seq)) {
      winners[matrixIndex] = {
        round,
        lastDraw: seq,
      };
    }
  }
}

/**
 * @param {number[][]} matrix
 * @param {number} seq
 * @returns {boolean}
 */
function isBingo(matrix, seq) {
  let row = -1;
  let col = -1;
  outer: for (let r = 0; r < matrix.length; r++) {
    for (let c = 0; c < matrix[r].length; c++) {
      if (matrix[r][c] === seq) {
        row = r;
        col = c;
        matrix[r][c] = null;
        break outer;
      }
    }
  }

  let res = false;

  if (row > -1) {
    res ||= matrix[row].reduce((prev, cur) => prev && cur === null, true);
  }
  if (col > -1) {
    let cur = true;
    for (let r = 0; r < matrix.length; r++) {
      cur &&= matrix[r][col] === null;
    }
    res ||= cur;
  }

  return res;
}

/**
 * @param {number[][]} matrix
 * @param {number} lastDraw
 * @returns {number}
 */
function calculateScore(matrix, lastDraw) {
  let score = 0;
  for (let r = 0; r < matrix.length; r++) {
    for (let c = 0; c < matrix[r].length; c++) {
      if (matrix[r][c] !== null) {
        score += matrix[r][c];
      }
    }
  }

  return score * lastDraw;
}

winners = Object.entries(winners)
  .map(([key, val]) => [+key, ...Object.values(val)].flat())
  .sort((a, b) => a[1] - b[1]);

console.log(
  `The solution to the first part is: ${calculateScore(matricies[winners[0][0]], winners[0][2])}`,
);

const [matrixIndex, _, lastDraw] = winners.at(-1);

console.log(
  `The solution to the second part is: ${calculateScore(matricies[matrixIndex], lastDraw)}`,
);
