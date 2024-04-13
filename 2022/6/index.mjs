import { parseInput } from "../../2023/util/parseInput.mjs";

const [line] = await parseInput("input.txt");

/**
 * @param {string} line
 * @param {number=4} offset
 * @returns {number}
 */
function findMarker(line, offset = 4) {
  for (let i = offset; i < line.length; i++) {
    const slice = line.slice(i - offset, i);
    const sliceSet = new Set(slice);
    if (sliceSet.size === offset) {
      return i;
    }
  }
}

console.log(`The solution to part one is: ${findMarker(line)}`);
console.log(`The solution to part two is: ${findMarker(line, 14)}`);
