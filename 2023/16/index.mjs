import { readFileSync } from "fs";

const DIRECTIONS = {
  NORTH: [0, -1],
  SOUTH: [0, 1],
  EAST: [1, 0],
  WEST: [-1, 0],
};

const POINTING_DIRECTIONS = {
  NORTH: "NORTH",
  SOUTH: "SOUTH",
  EAST: "EAST",
  WEST: "WEST",
};

const MIRRORS = {
  "/": {
    NORTH: [DIRECTIONS.WEST],
    EAST: [DIRECTIONS.SOUTH],
    SOUTH: [DIRECTIONS.EAST],
    WEST: [DIRECTIONS.NORTH],
  },
  ")": {
    NORTH: [DIRECTIONS.EAST],
    EAST: [DIRECTIONS.NORTH],
    SOUTH: [DIRECTIONS.WEST],
    WEST: [DIRECTIONS.SOUTH],
  },
  "|": {
    NORTH: [DIRECTIONS.SOUTH],
    EAST: [DIRECTIONS.NORTH, DIRECTIONS.SOUTH],
    SOUTH: [DIRECTIONS.NORTH],
    WEST: [DIRECTIONS.NORTH, DIRECTIONS.SOUTH],
  },
  "-": {
    NORTH: [DIRECTIONS.WEST, DIRECTIONS.EAST],
    EAST: [DIRECTIONS.WEST],
    SOUTH: [DIRECTIONS.WEST, DIRECTIONS.EAST],
    WEST: [DIRECTIONS.EAST],
  },
  ".": {
    NORTH: [DIRECTIONS.SOUTH],
    EAST: [DIRECTIONS.WEST],
    SOUTH: [DIRECTIONS.NORTH],
    WEST: [DIRECTIONS.EAST],
  },
};

const input = readFileSync("./input.txt", "utf8").trim().replaceAll("\\", ")");
// const input = String.raw`
// .|...\....
// |.-.\.....
// .....|-...
// ........|.
// ..........
// .........\
// ..../.\\..
// .-.-/..|..
// .|....-|.\
// ..//.|....`
//   .replaceAll("\\", ")")
//   .trim();

const rows = parseText(input);

console.log(rows);

const energyMatrix = rows.map((row) => row.map(() => new Set()));

propagateEnergy();

console.log(`The solution to the first part is ${calculateEnergizedCells()}`);

function parseText(input) {
  return input.split("\n").map((row) => row.split(""));
}

function stringifyRows(rows) {
  return rows
    .map((row) => row.join(""))
    .join("\n")
    .trim();
}

function propagateEnergy(curr = [0, 0], prevMove = [0, 0]) {
  const [x, y] = curr;

  let comingFrom = null;

  const guess = [x - prevMove[0], y - prevMove[1]];

  if (guess[0] === 0 && guess[1] === 1) {
    comingFrom = POINTING_DIRECTIONS.NORTH;
  } else if (guess[0] === 0 && guess[1] === -1) {
    comingFrom = POINTING_DIRECTIONS.SOUTH;
  } else if (guess[0] === -1 && guess[1] === 0) {
    comingFrom = POINTING_DIRECTIONS.EAST;
  } else {
    comingFrom = POINTING_DIRECTIONS.WEST;
  }

  if (
    x >= rows[0].length ||
    y >= rows.length ||
    x < 0 ||
    y < 0 ||
    energyMatrix[y][x].has(comingFrom)
  ) {
    return;
  }
  energyMatrix[y][x].add(comingFrom);

  const nextMoves = MIRRORS[rows[y][x]][comingFrom];

  for (const nextMove of nextMoves) {
    const [dx, dy] = nextMove;
    propagateEnergy([x + dx, y + dy], curr);
  }
}

function calculateEnergizedCells() {
  return energyMatrix.reduce((outerAcc, row) => {
    return outerAcc + row.reduce((acc, cell) => acc + (cell.size ? 1 : 0), 0);
  }, 0);
}
