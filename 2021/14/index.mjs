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

/**
 * @param {string[]} startingSeq
 * @param {Record<string, string>} map
 * @param {number} steps
 * @return {Record<string, number>}
 */
function stepThroughAgain(startingSeq, map, steps) {
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

const f2Map = stepThroughAgain(arr, map, 40);
const sortedf2 = Object.values(f2Map).sort((a, b) => b - a);

console.log(
  `The solution to the second part is: ${sortedf2.at(0) - sortedf2.at(-1)}`,
);
