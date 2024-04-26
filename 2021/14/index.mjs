import { parseInput } from "../../2023/util/parseInput.mjs";

const lines = await parseInput("input.txt");

let arr = lines.shift().split("");
lines.shift();

const map = {};

for (const line of lines) {
  const [seq, char] = line.trim().split(" -> ");
  map[seq] = char;
}

/**
 * @param {string[]} startingSeq
 * @param {Record<string, string>} map
 * @param {number} steps
 * @return {Record<string, number>}
 */
function stepThrough(startingSeq, map, steps) {
  let nextArr = [];
  for (let i = 0; i < steps; i++) {
    nextArr = [];
    for (let c = 1; c < startingSeq.length; c++) {
      const curChar = startingSeq[c];
      const prevChar = startingSeq[c - 1];
      const key = [prevChar, curChar].join("");
      if (c === 1) {
        nextArr.push(prevChar);
      }
      if (key in map) {
        nextArr.push(map[key], curChar);
      } else {
        nextArr.push(curChar);
      }
    }
    startingSeq = nextArr;
  }

  const freqMap = {};
  for (const char of nextArr) {
    if (char in freqMap) {
      freqMap[char] += 1;
    } else {
      freqMap[char] = 1;
    }
  }

  return freqMap;
}

const freqMap = stepThrough(arr, map, 10);

const sortedValues = Object.values(freqMap).sort((a, b) => b - a);

console.log(
  `The solution to the first part is: ${sortedValues.at(0) - sortedValues.at(-1)}`,
);
