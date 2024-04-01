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

/**
 * @param {number[]} startingPos
 * @param {string} direction
 */
function castRay(startingPos, direction) {
  const inversions = [];
  const countingBarriers = ["J", "L", "F", "7", "S"];
  switch (direction) {
    case "NORTH":
    case "SOUTH":
      countingBarriers.push("-");
      inversions.push("J", "F");
      break;
    case "WEST":
    case "EAST":
      countingBarriers.push("|");
      inversions.push("L", "7");
      break;
  }

  let barrierCount = 0;
  let inversionsCount = 0;
  const [dr, dc] = pm[direction];

  while (
    startingPos[0] < matrix.length &&
    startingPos[0] >= 0 &&
    startingPos[1] < matrix[0].length &&
    startingPos[1] >= 0
  ) {
    const curElem = matrix[startingPos[0]][startingPos[1]];
    if (
      countingBarriers.includes(curElem) &&
      visitedCells.has(`${startingPos[0]},${startingPos[1]}`)
    ) {
      if (inversions.includes(curElem)) {
        inversionsCount++;
      } else {
        barrierCount++;
      }
    }

    startingPos = [startingPos[0] + dr, startingPos[1] + dc];
  }

  return barrierCount + Math.floor(inversionsCount / 2);
}

let enclosedTiles = 0;

for (let r = 0; r < matrix.length; r++) {
  for (let c = 0; c < matrix[0].length; c++) {
    let isEnclosed = true;
    for (const [dir, delta] of Object.entries(pm)) {
      const [dr, dc] = delta;
      const [curR, curC] = [r + dr, c + dc];
      if (
        curR >= matrix.length ||
        curR < 0 ||
        curC >= matrix[0].length ||
        curC < 0
      ) {
        isEnclosed = false;
        break;
      }
      const barriers = castRay([r, c], dir);
      if (barriers % 2 === 0) {
        isEnclosed = false;
        break;
      }
    }
    if (isEnclosed) {
      enclosedTiles++;
    }
  }
}

console.log({ enclosedTiles });
