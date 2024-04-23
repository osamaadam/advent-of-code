import { parseInput } from "../../2023/util/parseInput.mjs";

const lines = await parseInput("input.txt");

const nums = lines.shift().trim().split(",").map(Number);

let min = Infinity;
let max = 0;

for (const num of nums) {
  min = Math.min(min, num);
  max = Math.max(max, num);
}

let minDistance = Infinity;
for (let i = min; i <= max; i++) {
  let distance = 0;
  for (let j = 0; j < nums.length; j++) {
    distance += Math.abs(nums[j] - i);
  }
  minDistance = Math.min(minDistance, distance);
}

console.log(`The solution to part one is: ${minDistance}`);
