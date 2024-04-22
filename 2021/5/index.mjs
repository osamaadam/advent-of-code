import { parseInput } from "../../2023/util/parseInput.mjs";

const lines = await parseInput("input.txt");

const ints = [];
let rows = 0;
let cols = 0;

for (const line of lines) {
  const [int1, int2] = line.split(" -> ");
  const [x1, y1] = int1.trim().split(",").map(Number);
  const [x2, y2] = int2.trim().split(",").map(Number);

  if (x1 !== x2 && y1 !== y2) {
    continue;
  }

  rows = Math.max(rows, Math.max(x1 + 1, x2 + 1));
  cols = Math.max(cols, Math.max(y1 + 1, y2 + 1));

  ints.push([
    [x1, y1],
    [x2, y2],
  ]);
}

const matrix = Array.from({ length: rows }, () =>
  Array.from({ length: cols }, () => 0),
);

for (const [int1, int2] of ints) {
  const [c1, r1] = int1;
  const [c2, r2] = int2;

  const rStart = Math.min(r1, r2);
  const rEnd = Math.max(r1, r2);
  const cStart = Math.min(c1, c2);
  const cEnd = Math.max(c1, c2);
  for (let r = rStart; r <= rEnd; r++) {
    for (let c = cStart; c <= cEnd; c++) {
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
