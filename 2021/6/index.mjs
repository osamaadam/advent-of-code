import { parseInput } from "../../2023/util/parseInput.mjs";

const lines = await parseInput("input.txt");

const nums = lines.shift().trim().split(",").map(Number);

for (let i = 0; i < 80; i++) {
  const newNums = [];

  for (let j = 0; j < nums.length; j++) {
    if (--nums[j] < 0) {
      nums[j] = 6;
      newNums.push(8);
    }
  }

  nums.push(...newNums);
}

console.log(`The solution for the first part is: ${nums.length}`);
