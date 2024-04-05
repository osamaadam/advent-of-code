import { parseInput } from "../util/parseInput.mjs";

const lines = await parseInput("input.txt");

/**
 * @param {string} line
 * @returns {[string, number[]]}
 */
function parseLine(line) {
  const [sequence, block] = line.trim().split(" ");
  const nums = block.split(",").map(Number);

  return [sequence, nums];
}

const cache = {};

/**
 * @param {string} seq
 * @param {number[]} nums
 * @returns {number}
 */
function countWays(seq, nums) {
  if (seq === "") {
    if (!nums.length) {
      return 1;
    }
    return 0;
  }

  if (!nums.length) {
    if (seq.includes("#")) {
      return 0;
    }

    return 1;
  }

  const cacheKey = `${seq},${nums}`;
  if (cacheKey in cache) {
    return cache[cacheKey];
  }

  let result = 0;

  if ([".", "?"].includes(seq[0])) {
    result += countWays(seq.slice(1), nums);
  }

  if (["#", "?"].includes(seq[0])) {
    if (
      nums[0] <= seq.length &&
      !seq.slice(0, nums[0]).includes(".") &&
      (nums[0] === seq.length || seq[nums[0]] !== "#")
    ) {
      result += countWays(seq.slice(nums[0] + 1), nums.slice(1));
    }
  }

  cache[cacheKey] = result;
  return result;
}

const partOneSolution = lines
  .map(parseLine)
  .map(([seq, nums]) => countWays(seq, nums))
  .reduce((prev, cur) => prev + cur, 0);

console.log(`The solution to part one is: ${partOneSolution}`);

const explodedLines = lines.map(parseLine).map(([seq, nums]) => [
  Array.from({ length: 5 }, () => seq).join("?"),
  Array.from({ length: 5 }, () => nums)
    .fill(nums)
    .flat(),
]);

const partTwoSolution = explodedLines
  .map(([seq, nums]) => countWays(seq, nums))
  .reduce((prev, cur) => prev + cur, 0);

console.log(`The solution to part two is: ${partTwoSolution}`);
