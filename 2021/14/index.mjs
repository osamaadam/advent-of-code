import { parseInput } from "../../2023/util/parseInput.mjs";

const lines = await parseInput("input.txt");

let arr = lines.shift().split("");
lines.shift();

const map = {};

for (const line of lines) {
  const [seq, char] = line.trim().split(" -> ");
  map[seq] = char;
}

let freqMap = stepThrough(arr, map, 10);

let sortedValues = Object.values(freqMap).sort((a, b) => b - a);

console.log(
  `The solution to the first part is: ${sortedValues.at(0) - sortedValues.at(-1)}`,
);

freqMap = stepThrough(arr, map, 40);
sortedValues = Object.values(freqMap).sort((a, b) => b - a);

console.log(
  `The solution to the second part is: ${sortedValues.at(0) - sortedValues.at(-1)}`,
);

/**
 * @param {string[]} startingSeq
 * @param {Record<string, string>} map
 * @param {number} steps
 * @return {Record<string, number>}
 */
function stepThrough(startingSeq, map, steps) {
  const freqMap = {
    [startingSeq[0]]: 1,
  };
  let patternMap = {};
  for (let i = 1; i < startingSeq.length; i++) {
    const prev = startingSeq[i - 1];
    const cur = startingSeq[i];
    const key = [prev, cur].join("");

    patternMap[key] = (patternMap[key] ?? 0) + 1;

    if (cur in freqMap) {
      freqMap[cur] += 1;
    } else {
      freqMap[cur] = 1;
    }
  }

  for (let i = 0; i < steps; i++) {
    const nextPatternMap = {};
    for (const key of Object.keys(patternMap)) {
      if (key in map && key in patternMap) {
        const curFreq = patternMap[key];
        const charInBetween = map[key];
        if (charInBetween in freqMap) {
          freqMap[charInBetween] += curFreq;
        } else {
          freqMap[charInBetween] = curFreq;
        }
        const nextSeqs = [
          [key[0], charInBetween].join(""),
          [charInBetween, key[1]].join(""),
        ];
        for (const seq of nextSeqs) {
          if (seq in nextPatternMap) {
            nextPatternMap[seq] += curFreq;
          } else {
            nextPatternMap[seq] = curFreq;
          }
        }
      } else {
        nextPatternMap[key] = 1;
      }
    }
    patternMap = nextPatternMap;
  }

  return freqMap;
}
