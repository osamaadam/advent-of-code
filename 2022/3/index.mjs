import { parseInput } from "../../2023/util/parseInput.mjs";

const lines = await parseInput("input.txt");

/** @param {string} line
 * @returns {string[]}
 */
function findDuplicates(line) {
  const firstHalf = new Set([...line.slice(0, line.length / 2).split("")]);
  const secondHalf = line.slice(line.length / 2).split("");

  const duplicateLetters = new Set();

  for (const l of secondHalf) {
    if (firstHalf.has(l)) {
      duplicateLetters.add(l);
    }
  }

  return [...duplicateLetters];
}

/**
 * @param {string} letter
 * @returns {number}
 */
function getPriority(letter) {
  if (letter.toUpperCase() === letter) {
    return letter.charCodeAt(0) - 38;
  }

  return letter.charCodeAt(0) - 96;
}

const duplicateChars = lines
  .map(findDuplicates)
  .flat()
  .map(getPriority)
  .reduce((prev, cur) => prev + cur, 0);

console.log(`The solution to part 1 is: ${duplicateChars}`);

/**
 * @param {string[]} arr
 * @returns {string}
 */
function findCommonChar(arr) {
  const map = {};

  for (let i = 0; i < arr.length; i++) {
    const cur = arr[i];
    const curSet = new Set();
    for (const char of cur.split("")) {
      if (i === 0) {
        map[char] = 1;
      } else {
        if (curSet.has(char) || !(char in map)) {
          continue;
        }
        map[char] += 1;
        curSet.add(char);
      }
    }
  }

  return Object.entries(map).find(([_, val]) => val === 3)[0];
}

let total = 0;

for (let i = 0; i < lines.length; i += 3) {
  total += getPriority(findCommonChar(lines.slice(i, i + 3)));
}

console.log(`The solution to part two is: ${total}`);
