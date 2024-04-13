import internal from "stream";
import { parseInput } from "../../2023/util/parseInput.mjs";

const lines = await parseInput("input.txt");

/**
 * @param {string} inter
 * @returns {number[]}
 */
function parseInterval(inter) {
  return inter.split("-").map(Number);
}

/**
 * @param {string} interval1
 * @param {string} interval2
 * @returns {string} intersection
 */
function findIntersection(interval1, interval2) {
  const [start1, end1] = parseInterval(interval1);
  const [start2, end2] = parseInterval(interval2);

  if (start2 >= start1 && start2 <= end1) {
    const start = start2;
    const end = Math.min(end1, end2);

    return `${start}-${end}`;
  } else if (start1 >= start2 && start1 <= end2) {
    const start = start1;
    const end = Math.min(end1, end2);

    return `${start}-${end}`;
  }

  return null;
}

const pairs = lines.map((line) => line.split(","));

let fullyContainedPairs = 0;
let overLappingPairs = 0;

for (const pair of pairs) {
  const intersection = findIntersection(...pair);
  if (intersection) {
    overLappingPairs++;
  }
  if (intersection === pair[0] || intersection === pair[1]) {
    fullyContainedPairs++;
  }
}

console.log(`The solution to part one is: ${fullyContainedPairs}`);
console.log(`The solution to part two is: ${overLappingPairs}`);
