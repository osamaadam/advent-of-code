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

console.log(`The solution to the first part is: ${bfs()}`);
