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

let cur = [0, 0];

let [minRow, maxRow] = [Infinity, -Infinity];
let [minCol, maxCol] = [Infinity, -Infinity];

const path = new Set();

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
    minRow = Math.min(cur[0], minRow);
    maxRow = Math.max(cur[0], maxRow);
    minCol = Math.min(cur[1], minCol);
    maxCol = Math.max(cur[1], maxCol);

    const key = cur.join(",");
    path.add(key);
    cur[0] += dr;
    cur[1] += dc;
  }
}

/**
 * @param {number} row
 * @param {number} row
 * @returns {boolean}
 */
function isInPolygon(row, col) {
  let key = [row, col].join(",");
  if (path.has(key)) {
    return true;
  }
  let rightHits = 0;

  let [r, c] = [row, col + 1];
  while (c <= maxCol) {
    key = [r, c].join(",");
    if (path.has(key)) {
      if (c - 1 >= minCol) {
        const prevKey = [r, c - 1].join(",");
        if (path.has(prevKey)) {
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
  while (c >= minCol) {
    key = [r, c].join(",");
    if (path.has(key)) {
      if (c + 1 <= maxCol) {
        const prevKey = [r, c + 1].join(",");
        if (path.has(prevKey)) {
          c--;
          continue;
        }
      }
      leftHits++;
    }
    c--;
  }

  const isInside =
    rightHits > 0 && leftHits > 0 && (leftHits + rightHits) % 2 === 0;

  return isInside;
}

let cubicmeters = 0;

for (let r = minRow; r <= maxRow; r++) {
  for (let c = minCol; c <= maxCol; c++) {
    if (isInPolygon(r, c)) {
      cubicmeters++;
    }
  }
}

console.log(cubicmeters);

function printMatrix() {
  const matrix = Array.from(
    {
      length: maxRow - minRow + 1,
    },
    () => Array.from({ length: maxCol - minCol + 1 }, () => 0),
  );

  for (let r = 0; r < matrix.length; r++) {
    for (let c = 0; c < matrix[r].length; c++) {
      const key = [r + minRow, c + minCol].join(",");
      if (path.has(key)) {
        matrix[r][c] = 1;
      }
    }
  }

  console.log(matrix.map((row) => row.join("")).join("\n"));
}
