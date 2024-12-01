import { parseInput } from "../../2023/util/parseInput.mjs";

const lines = await parseInput("./input.txt");

let left = [];
let right = [];

for (const line of lines) {
  const [l, r] = line.split("  ");
  left.push(parseInt(l));
  right.push(parseInt(r));
}

left = left.sort((a, b) => a - b);
right = right.sort((a, b) => a - b);

let distance = 0;

for (let i = 0; i < left.length; i++) {
  distance += Math.abs(left[i] - right[i]);
}

console.log(`The total distance for part 1 is: ${distance}`);
