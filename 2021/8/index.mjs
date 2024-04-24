import { parseInput } from "../../2023/util/parseInput.mjs";

const lines = await parseInput("input.txt");

const uniqueDigits = {
  2: 1,
  4: 4,
  3: 7,
  7: 8,
};

let uniqs = 0;

for (const line of lines) {
  const [_, displayPart] = line.trim().split(" | ");

  const nums = displayPart.trim().split(" ");
  for (const num of nums) {
    const len = num.length;
    if (len in uniqueDigits) {
      uniqs++;
    }
  }
}

console.log(`The solution to the first part is: ${uniqs}`);
