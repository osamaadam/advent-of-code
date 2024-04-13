import { parseInput } from "../../2023/util/parseInput.mjs";

const lines = await parseInput("input.txt");

let curCals = 0;
let curMax = 0;

for (const line of lines) {
  if (line === "") {
    curMax = Math.max(curMax, curCals);
    curCals = 0;
    continue;
  }

  const cur = parseInt(line.trim(), 10);
  curCals += cur;
}

console.log(`The solution to part one is: ${curMax}`);
