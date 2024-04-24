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

/**
 * @param {string} line
 * @returns {number[]}
 */
function findScores(line) {
  const chars = line.trim().split("");
  const stack = [];
  for (const char of chars) {
    switch (char) {
      case ")":
        if (stack.at(-1) !== "(") {
          return 0;
        }
        stack.pop();
        break;
      case "]":
        if (stack.at(-1) !== "[") {
          return 0;
        }
        stack.pop();
        break;
      case "}":
        if (stack.at(-1) !== "{") {
          return 0;
        }
        stack.pop();
        break;
      case ">":
        if (stack.at(-1) !== "<") {
          return 0;
        }
        stack.pop();
        break;
      default:
        stack.push(char);
        break;
    }
  }

  const SCORES = {
    "(": 1,
    "[": 2,
    "{": 3,
    "<": 4,
  };

  return stack
    .map((char) => SCORES[char])
    .reverse()
    .reduce((prev, cur) => prev * 5 + cur, 0);
}

const solution = lines
  .map(findScores)
  .filter((num) => num > 0)
  .sort((a, b) => a - b);

console.log(
  `The solution to the second part is: ${solution[Math.floor(solution.length / 2)]}`,
);
