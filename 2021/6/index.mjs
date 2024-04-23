import { parseInput } from "../../2023/util/parseInput.mjs";

const lines = await parseInput("input.txt");

const nums = lines.shift().trim().split(",").map(Number);

console.log(`The solution for the first part is: ${calculateNums(nums, 80)}`);
console.log(`The solution for the second part is: ${calculateNums(nums, 256)}`);

/**
 * @param {number[]} nums
 * @param {number} cycles
 * @returns {number}
 */
function calculateNums(nums, cycles) {
  let freqMap = {};

  for (const num of nums) {
    if (num in freqMap) {
      freqMap[num] += 1;
    } else {
      freqMap[num] = 1;
    }
  }

  for (let i = 0; i < cycles; i++) {
    const newFreq = {};
    for (const [key, val] of Object.entries(freqMap).sort(
      (a, b) => b[0] - a[0],
    )) {
      switch (+key) {
        case 0:
          newFreq[6] = (newFreq[6] ?? 0) + val;
          newFreq[8] = val;
          break;
        default:
          newFreq[+key - 1] = val;
          break;
      }
    }
    freqMap = newFreq;
  }

  return Object.values(freqMap).reduce((prev, cur) => prev + cur, 0);
}
