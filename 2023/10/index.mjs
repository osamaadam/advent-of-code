import { parseInput } from "../util/parseInput.mjs";

const lines = await parseInput("input.txt");

const matrix = lines.map((line) => line.split(""));

const pm = {
  EAST: [0, 1],
  WEST: [0, -1],
  SOUTH: [1, 0],
  NORTH: [-1, 0],
};

/**
 * @param {number[][]} matrix
 * @returns {number[]}
 */
function findStartingPos(matrix) {
  for (let row = 0; row < matrix.length; row++) {
    for (let col = 0; col < matrix[row].length; col++) {
      const curElem = matrix[row][col];
      if (curElem === "S") {
        return [row, col];
      }
    }
  }
}

/**
 * @param {number[]} startingPos
 * @param {number[][]} matrix
 * @returns {Set<string>}
 */
function navigateLoop(startingPos, matrix) {
  const visited = new Set();
  const queue = [startingPos];

  while (queue.length) {
    const [r, c] = queue.shift();
    visited.add(`${r},${c}`);
    const curElem = matrix[r][c];

    for (let [direction, delta] of Object.entries(pm)) {
      const [dr, dc] = delta;
      const [nextR, nextC] = [r + dr, c + dc];
      if (
        nextR >= matrix.length ||
        nextR < 0 ||
        nextC >= matrix.length ||
        nextC < 0 ||
        visited.has(`${nextR},${nextC}`)
      ) {
        continue;
      }
      const nextElem = matrix[nextR][nextC];
      switch (direction) {
        case "NORTH": {
          if (
            ["|", "7", "F"].includes(nextElem) &&
            ["|", "L", "J", "S"].includes(curElem)
          ) {
            queue.push([nextR, nextC]);
          }
          break;
        }
        case "SOUTH": {
          if (
            ["|", "L", "J"].includes(nextElem) &&
            ["|", "F", "7", "S"].includes(curElem)
          ) {
            queue.push([nextR, nextC]);
          }
          break;
        }
        case "WEST": {
          if (
            ["-", "L", "F"].includes(nextElem) &&
            ["-", "J", "7", "S"].includes(curElem)
          ) {
            queue.push([nextR, nextC]);
          }
          break;
        }
        case "EAST": {
          if (
            ["-", "J", "7"].includes(nextElem) &&
            ["-", "L", "F", "S"].includes(curElem)
          ) {
            queue.push([nextR, nextC]);
          }
          break;
        }
      }
    }
  }

  return visited;
}

const visitedCells = navigateLoop(findStartingPos(matrix), matrix);

console.log(`The solution to part one is: ${visitedCells.size / 2}`);
