import { parseInput } from "../../2023/util/parseInput.mjs";

const lines = await parseInput("input.txt");

const seqs = lines.shift().split(",").map(Number);
lines.shift();

let matrix = [];
const matricies = [];

for (const [i, line] of lines.entries()) {
  if (line.length) {
    const row = line.split(" ").map(Number);
    matrix.push(row);
  }
  if (i === lines.length - 1 || line === "") {
    matricies.push(matrix);
    matrix = [];
  }
}

let lastDraw = null;
let winnerIndex = null;

outer: for (const seq of seqs) {
  lastDraw = seq;
  for (const [i, matrix] of matricies.entries()) {
    if (isBingo(matrix, seq)) {
      winnerIndex = i;
      break outer;
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
  outer: for (let r = 0; r < matrix.length; r++) {
    for (let c = 0; c < matrix[r].length; c++) {
      if (matrix[r][c] === seq) {
        row = r;
        matrix[r][c] = null;
        break outer;
      }
    }
  }

  if (row === -1) {
    return false;
  }

  return matrix[row].reduce((prev, cur) => prev && cur === null, true);
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

console.log(
  `The solution to the first part is: ${calculateScore(matricies[winnerIndex], lastDraw)}`,
);
