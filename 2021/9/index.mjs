import { parseInput } from "../../2023/util/parseInput.mjs";

const lines = await parseInput("input.txt");

const matrix = lines.map((line) => line.split("").map(Number));

const DIRS = [
  [0, 1],
  [0, -1],
  [1, 0],
  [-1, 0],
];

function bfs() {
  let total = 0;
  const visited = new Set();
  const queue = [[0, 0]];
  while (queue.length) {
    const [row, col] = queue.shift();
    const key = [row, col].join(",");
    if (visited.has(key)) {
      continue;
    }
    visited.add(key);
    const height = matrix[row][col];

    let minHeight = Infinity;

    for (const [dr, dc] of DIRS) {
      const [r, c] = [row + dr, col + dc];
      if (r < 0 || r >= matrix.length || c < 0 || c >= matrix[0].length) {
        continue;
      }
      minHeight = Math.min(minHeight, matrix[r][c]);
      queue.push([r, c]);
    }

    if (height < minHeight) {
      total += height + 1;
    }
  }

  return total;
}

/**
 * @param {number[][]} matrix
 * @returns {number[][]}
 */
function findBasins(matrix) {
  const visited = new Set();
  const basins = [];

  for (let r = 0; r < matrix.length; r++) {
    for (let c = 0; c < matrix[r].length; c++) {
      const queue = [[r, c]];
      const basin = [];
      while (queue.length) {
        const [row, col] = queue.shift();
        const k = [row, col].join(",");
        if (visited.has(k) || matrix[row][col] >= 9) {
          continue;
        }
        visited.add(k);

        basin.push([row, col]);
        for (const [dr, dc] of DIRS) {
          const [r2, c2] = [row + dr, col + dc];
          if (
            r2 < 0 ||
            r2 >= matrix.length ||
            c2 < 0 ||
            c2 >= matrix[0].length
          ) {
            continue;
          }

          queue.push([r2, c2]);
        }
      }
      if (basin.length) {
        basins.push(basin);
      }
    }
  }

  return basins;
}

console.log(`The solution to the first part is: ${bfs()}`);

const multi = findBasins(matrix)
  .sort((a, b) => b.length - a.length)
  .slice(0, 3)
  .reduce((prev, cur) => prev * cur.length, 1);

console.log(`The solution to the second part is: ${multi}`);
