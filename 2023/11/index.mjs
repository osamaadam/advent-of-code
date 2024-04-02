import { parseInput } from "../util/parseInput.mjs";

const lines = await parseInput("input.txt");

const matrix = lines.map((row) => row.split(""));

let rowsToExplode = Array.from(Array(matrix.length)).reduce(
  (prev, _, i) => ({ ...prev, [i]: true }),
  {},
);
let colsToExplode = Array.from(Array(matrix[0].length)).reduce(
  (prev, _, i) => ({ ...prev, [i]: true }),
  {},
);

for (let r = 0; r < matrix.length; r++) {
  for (let c = 0; c < matrix[r].length; c++) {
    const elem = matrix[r][c];
    const isGalaxy = elem === "#";
    rowsToExplode[r] &&= !isGalaxy;
    colsToExplode[c] &&= !isGalaxy;
  }
}

rowsToExplode = Object.entries(rowsToExplode)
  .filter(([_, isEmpty]) => isEmpty)
  .map(([key, _val]) => parseInt(key, 10));
colsToExplode = Object.entries(colsToExplode)
  .filter(([_, isEmpty]) => isEmpty)
  .map(([key, _val]) => parseInt(key, 10));

const galaxies = [];

for (let r = 0; r < matrix.length; r++) {
  for (let c = 0; c < matrix[r].length; c++) {
    const curElem = matrix[r][c];
    if (curElem === "#") {
      galaxies.push([r, c]);
    }
  }
}

function getExplosionsInbetween(a, b) {
  const [aR, aC] = a;
  const [bR, bC] = b;

  let explosions = 0;

  for (let rowExplosion of rowsToExplode) {
    if (rowExplosion < Math.max(aR, bR) && rowExplosion > Math.min(aR, bR)) {
      explosions++;
    }
  }
  for (let colExplosion of colsToExplode) {
    if (colExplosion < Math.max(aC, bC) && colExplosion > Math.min(aC, bC)) {
      explosions++;
    }
  }

  return explosions;
}

function calculateTotalPaths(multiplier = 1) {
  let totalPaths = 0;
  for (let i = 0; i < galaxies.length; i++) {
    const [aR, aC] = galaxies[i];
    for (let j = i + 1; j < galaxies.length; j++) {
      const [bR, bC] = galaxies[j];
      const explosions = getExplosionsInbetween(galaxies[i], galaxies[j]);
      const distance =
        Math.abs(aR - bR) +
        Math.abs(aC - bC) +
        explosions * multiplier -
        explosions;
      totalPaths += distance;
    }
  }
  return totalPaths;
}

console.log(`The solution to part one is: ${calculateTotalPaths(2)}`);
console.log(`The solution to part two is: ${calculateTotalPaths(1_000_000)}`);
