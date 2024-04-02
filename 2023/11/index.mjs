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
  .map(([key, _val], i) => parseInt(key, 10) + i);
colsToExplode = Object.entries(colsToExplode)
  .filter(([_, isEmpty]) => isEmpty)
  .map(([key, _val], i) => parseInt(key, 10) + i);

const emptyRow = Array.from(Array(matrix.length), () => ".");

let explodedMatrix = Array.from(matrix);

for (let r = 0; r < explodedMatrix.length; r++) {
  if (rowsToExplode.includes(r)) {
    explodedMatrix = [
      ...explodedMatrix.slice(0, r),
      emptyRow,
      ...explodedMatrix.slice(r),
    ];
  }
  for (let c = 0; c < explodedMatrix[r].length; c++) {
    if (colsToExplode.includes(c)) {
      explodedMatrix[r] = [
        ...explodedMatrix[r].slice(0, c),
        ".",
        ...explodedMatrix[r].slice(c),
      ];
    }
  }
}

const galaxies = [];

for (let r = 0; r < explodedMatrix.length; r++) {
  for (let c = 0; c < explodedMatrix[r].length; c++) {
    const curElem = explodedMatrix[r][c];
    if (curElem === "#") {
      galaxies.push([r, c]);
    }
  }
}

let totalPaths = 0;
for (let i = 0; i < galaxies.length; i++) {
  const [aR, aC] = galaxies[i];
  for (let j = i + 1; j < galaxies.length; j++) {
    const [bR, bC] = galaxies[j];
    const distance = Math.abs(aR - bR) + Math.abs(aC - bC);
    totalPaths += distance;
  }
}

console.log(`The solution to part one is: ${totalPaths}`);
