import { parseInput } from "../../2023/util/parseInput.mjs";

const lines = await parseInput("input.txt");
const SCORES = {
  ")": 3,
  "]": 57,
  "}": 1197,
  ">": 25137,
};

function findFirstIllegallChar(line) {
  const chars = line.trim().split("");
  const stack = [];
  for (const char of chars) {
    switch (char) {
      case ")":
        if (stack.at(-1) !== "(") {
          return char;
        }
        stack.pop();
        break;
      case "]":
        if (stack.at(-1) !== "[") {
          return char;
        }
        stack.pop();
        break;
      case "}":
        if (stack.at(-1) !== "{") {
          return char;
        }
        stack.pop();
        break;
      case ">":
        if (stack.at(-1) !== "<") {
          return char;
        }
        stack.pop();
        break;
      default:
        stack.push(char);
        break;
    }
  }
}

const score = lines
  .map(findFirstIllegallChar)
  .map((char) => SCORES[char] ?? 0)
  .reduce((prev, cur) => prev + cur, 0);

console.log(`The solution to the first part is: ${score}`);
