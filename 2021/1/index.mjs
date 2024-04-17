import { parseInput } from "../../2023/util/parseInput.mjs";

const lines = await parseInput("input.txt");

const depths = lines.map(Number);

let increases = 0;

for (let i = 1; i < depths.length; i++) {
  if (depths[i] > depths[i - 1]) {
    increases++;
  }
}

console.log(`The solution to part one is: ${increases}`);

let prev = Infinity;
increases = 0;

for (let l = 0; l < depths.length - 2; l++) {
  let sum = depths[l];
  for (let r = l + 1; r < Math.min(depths.length, l + 3); r++) {
    sum += depths[r];
  }
  if (sum > prev) {
    increases++;
  }
  prev = sum;
}

console.log(`The solution to part two is: ${increases}`);
