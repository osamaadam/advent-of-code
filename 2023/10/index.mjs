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
        nextC >= matrix[0].length ||
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

// Hack, have to manually replace S. I'm sure there's a clever way to do it
// But I'm tired
const [r, c] = findStartingPos(matrix);
matrix[r][c] = "L";

/**
 * @param {number[]} startingPos
 * @param {"WEST"|"EAST"} direction
 */
function castRay(startingPos, direction) {
  const countingBarriers = ["J", "L", "|"];

  let barrierCount = 0;
  const r = startingPos[0];
  const row = matrix[r];

  for (let c = 0; c < row.length; c++) {
    if (direction === "WEST" && c <= startingPos[1]) {
      continue;
    }
    if (direction === "EAST" && c >= startingPos[1]) {
      break;
    }
    if (countingBarriers.includes(row[c]) && visitedCells.has(`${r},${c}`)) {
      barrierCount++;
    }
  }

  return barrierCount;
}

let enclosedTiles = 0;

for (let r = 0; r < matrix.length; r++) {
  for (let c = 0; c < matrix[0].length; c++) {
    if (visitedCells.has(`${r},${c}`)) {
      continue;
    }
    const eastBarriers = castRay([r, c], "EAST");
    const westBarriers = castRay([r, c], "WEST");
    if (eastBarriers % 2 === 1 && westBarriers % 2 === 1) {
      enclosedTiles++;
    }
  }
}

console.log(`The solution to part two is: ${enclosedTiles}`);
