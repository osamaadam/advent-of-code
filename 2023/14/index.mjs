import { readFileSync } from "fs";

const MOVABLE_ROCK = "O";
const STATIC_ROCK = "#";
const EMPTY = ".";

const DIRECTIONS = {
  NORTH: [-1, 0],
  WEST: [0, -1],
  SOUTH: [1, 0],
  EAST: [0, 1],
};

// const input = readFileSync("./input.txt", "utf-8").trim();

// const weight = calculatePartOne(input);
//
// console.log(`Weight for part 1: ${weight}`);

const weight2 = calculatePartTwo(
  `
O....#....
O.OO#....#
.....##...
OO.#O....O
.O.....O#.
O.#..O.#.#
..O..#O..O
.......O..
#....###..
#OO..#....`.trim(),
);

console.log(`Weight for part 2: ${weight2}`);

function parseText(text) {
  const lines = text.split("\n");

  const rows = lines.map((line) => line.split(""));

  return rows;
}

function stringifyRows(rows) {
  return rows.map((row) => row.join("")).join("\n");
}

function calculateWeight(text) {
  const rows = parseText(text);
  const numOfRows = rows.length;
  const weight = rows.reduce((acc, row, i) => {
    const numOfMovableRocks = row.filter(
      (cell) => cell !== EMPTY && cell !== STATIC_ROCK,
    ).length;
    const rowWeight = numOfMovableRocks * (numOfRows - i);

    return acc + rowWeight;
  }, 0);

  return weight;
}

function calculatePartOne(input) {
  let rows = parseText(input);

  rows = cycle(rows, DIRECTIONS.NORTH);

  const weight = calculateWeight(stringifyRows(rows));

  return weight;
}

function cycle(rows, direction) {
  for (let i = 0; i < rows.length; i++) {
    for (let j = 0; j < rows[i].length; j++) {
      let x = i;
      let y = j;
      if (rows[x][y] === MOVABLE_ROCK) {
        let lastSeenEmptySpot = [x, y];
        while (
          x >= 0 &&
          x < rows.length &&
          y >= 0 &&
          y < rows[x].length &&
          rows[x][y] !== STATIC_ROCK
        ) {
          if (rows[x][y] === EMPTY) {
            lastSeenEmptySpot = [x, y];
          }
          x += direction[0];
          y += direction[1];
        }
        const temp = rows[lastSeenEmptySpot[0]][lastSeenEmptySpot[1]];
        rows[lastSeenEmptySpot[0]][lastSeenEmptySpot[1]] = rows[i][j];
        rows[i][j] = temp;
      }
    }
  }

  return rows;
}

function calculatePartTwo(input) {
  let rows = parseText(input);

  const cycles = [
    DIRECTIONS.NORTH,
    DIRECTIONS.WEST,
    DIRECTIONS.SOUTH,
    DIRECTIONS.EAST,
  ];

  for (let i = 0; i < 1000000000; i++) {
    for (const c of cycles) {
      rows = cycle(rows, c);
    }
  }

  console.log(stringifyRows(rows));

  return calculateWeight(stringifyRows(rows));
}
