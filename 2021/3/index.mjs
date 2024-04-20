import { parseInput } from "../../2023/util/parseInput.mjs";

const lines = await parseInput("input.txt");

const mostCommon = Array.from({ length: lines[0].length }, () => 0);

for (const line of lines) {
  for (let i = 0; i < line.length; i++) {
    const char = line[i];
    mostCommon[i] += char === "1" ? 1 : -1;
  }
}

const gamma = mostCommon.map((num) => (num > 0 ? 1 : 0)).join("");
const epsilon = mostCommon.map((num) => (num > 0 ? 0 : 1)).join("");

const result = parseInt(gamma, 2) * parseInt(epsilon, 2);

console.log(`The solution to the first part is: ${result}`);
