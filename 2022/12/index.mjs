import { parseInput } from "../../2023/util/parseInput.mjs";

const lines = await parseInput("input.txt");

const matrix = lines.map((row) => row.split(""));

let startingPoint = null;
let endingPoint = null;

for (let r = 0; r < matrix.length; r++) {
  for (let c = 0; c < matrix[r].length; c++) {
    const el = matrix[r][c];
    if (el === "S") {
      startingPoint = [r, c].join(",");
    } else if (el === "E") {
      endingPoint = [r, c].join(",");
    }
  }
}

const DIRS = [
  [0, 1],
  [0, -1],
  [1, 0],
  [-1, 0],
];

/**
 * @typedef Info
 * @property {string} prev
 * @property {number} distance
 */

/**
 * @param {string[][]} matrix
 * @param {number[]} startingPoint
 * @returns {Record<string, Info>}
 */
function mapShortestPaths(matrix, startingPoint) {
  /** @type {Record<string, Info>} */
  const map = {
    [startingPoint.join(",")]: {
      distance: 0,
      prev: startingPoint,
    },
  };
  const queue = [startingPoint];
  const visited = new Set();

  while (queue.length) {
    const [row, col] = queue.shift();
    const key = [row, col].join(",");
    if (visited.has(key) || matrix[row][col] === "E") {
      continue;
    }
    visited.add(key);

    const curVal = matrix[row][col].charCodeAt(0);
    for (const [dr, dc] of DIRS) {
      const [r, c] = [row + dr, col + dc];
      if (r < 0 || r >= matrix.length || c < 0 || c >= matrix[r].length) {
        continue;
      }
      const nextVal = matrix[r][c].charCodeAt(0);
      if (
        nextVal - curVal > 1 &&
        curVal !== "S".charCodeAt(0) &&
        nextVal !== "E".charCodeAt(0)
      ) {
        continue;
      }

      queue.push([r, c]);
      const k = [r, c].join(",");
      const curDist = 1 + map[key].distance;
      if ((map[k]?.distance ?? Infinity) > curDist) {
        map[k] = {
          prev: key,
          distance: curDist,
        };
      }
    }
  }

  return map;
}

const pathsMap = mapShortestPaths(matrix, startingPoint.split(",").map(Number));
const shortestPath = pathsMap[endingPoint].distance;

console.log(`The solution to the first part is: ${shortestPath}`);
