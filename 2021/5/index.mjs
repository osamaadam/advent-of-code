import { parseInput } from "../../2023/util/parseInput.mjs";

const lines = await parseInput("input.txt");

const ints = [];
const diagonals = [];
let rows = 1;
let cols = 1;

for (const line of lines) {
  const [int1, int2] = line.split(" -> ");
  const [x1, y1] = int1.trim().split(",").map(Number);
  const [x2, y2] = int2.trim().split(",").map(Number);

  rows = Math.max(rows, Math.max(x1 + 1, x2 + 1));
  cols = Math.max(cols, Math.max(y1 + 1, y2 + 1));

  const slope = (x2 - x1) / (y2 - y1);
  const int = [
    [x1, y1],
    [x2, y2],
  ].sort((a, b) => a[0] - b[0]);

  if (slope === 1 || slope === -1) {
    diagonals.push(int);
    continue;
  }

  if (x1 !== x2 && y1 !== y2) {
    continue;
  }

  ints.push(int);
}

const matrix = Array.from({ length: rows }, () =>
  Array.from({ length: cols }, () => 0),
);

for (const [int1, int2] of ints) {
  const [x1, y1] = int1;
  const [x2, y2] = int2;

  const yStart = Math.min(y1, y2);
  const yEnd = Math.max(y1, y2);
  const xStart = Math.min(x1, x2);
  const xEnd = Math.max(x1, x2);
  for (let r = yStart; r <= yEnd; r++) {
    for (let c = xStart; c <= xEnd; c++) {
      matrix[r][c] += 1;
    }
  }
}

let overlaps = 0;
for (let r = 0; r < matrix.length; r++) {
  for (let c = 0; c <= matrix[r].length; c++) {
    if (matrix[r][c] > 1) {
      overlaps++;
    }
  }
}

console.log(`The solution to the first part is: ${overlaps}`);

for (const [int1, int2] of diagonals) {
  const [x1, y1] = int1;
  const [x2, y2] = int2;
  const slope = (y2 - y1) / (x2 - x1);
  const span = x2 - x1;

  for (let i = 0; i <= span; i++) {
    const x = x1 + i;
    const y = y1 + i * slope;
    matrix[y][x] += 1;
  }
}

overlaps = 0;
for (let r = 0; r < matrix.length; r++) {
  for (let c = 0; c <= matrix[r].length; c++) {
    if (matrix[r][c] > 1) {
      overlaps++;
    }
  }
}

console.log(`The solution to the second part is: ${overlaps}`);
