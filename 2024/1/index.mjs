import { parseInput } from "../../2023/util/parseInput.mjs";

const lines = await parseInput("./input.txt");

let left = [];
let right = [];
const freq = {};

for (const line of lines) {
  const [l, r] = line.split("  ");
  const lInt = parseInt(l);
  const rInt = parseInt(r);
  left.push(lInt);
  right.push(rInt);
  freq[rInt] = (freq[rInt] || 0) + 1;
}

left = left.sort((a, b) => a - b);
right = right.sort((a, b) => a - b);

let distance = 0;

for (let i = 0; i < left.length; i++) {
  distance += Math.abs(left[i] - right[i]);
}

console.log(`The total distance for part 1 is: ${distance}`);

let similarityScore = 0;

for (const l of left) {
  similarityScore += l * (freq[l] || 0);
}

console.log(`The similarity score for part 2 is: ${similarityScore}`);
