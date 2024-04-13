import { parseInput } from "../../2023/util/parseInput.mjs";

const lines = await parseInput("input.txt");

const calArr = [];
let curCals = 0;

for (const line of lines) {
  if (line === "") {
    calArr.push(curCals);
    curCals = 0;
    continue;
  }

  const cur = parseInt(line.trim(), 10);
  curCals += cur;
}

const sortedArr = calArr.sort((a, b) => b - a);

console.log(`The solution to part one is: ${sortedArr[0]}`);

console.log(
  `The solution to part two is: ${sortedArr.slice(0, 3).reduce((prev, cur) => prev + cur, 0)}`,
);
