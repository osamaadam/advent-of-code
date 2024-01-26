import { readFileSync } from "fs";

const MOVABLE_ROCK = "0";
const STATIC_ROCK = "#";
const EMPTY = ".";

const input = readFileSync("./input.txt", "utf-8").trim();

const weight = calculatePartOne(input);

console.log(`Weight for part 1: ${weight}`);

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
  const rows = parseText(input);
  for (let i = 0; i < rows.length; i++) {
    for (let j = 0; j < rows[i].length; j++) {
      let x = i;
      let y = j;
      /**
       * For some reason "0" === "0" keeps evaluating to false in node 20
       * Hence, the weird conditionals
       */
      if (rows[x][y] != EMPTY && rows[x][y] != STATIC_ROCK) {
        while (x >= 1 && rows[x - 1][y] === EMPTY) {
          rows[x - 1][y] = MOVABLE_ROCK;
          rows[x][y] = EMPTY;
          x--;
        }
      }
    }
  }

  const weight = calculateWeight(stringifyRows(rows));

  return weight;
}
