import { parseInput } from "../../2023/util/parseInput.mjs";

const lines = await parseInput("input.txt");

const uniqueDigits = {
  2: 1,
  4: 4,
  3: 7,
  7: 8,
};

const digits = [];

let uniqs = 0;
let total = 0;

for (const line of lines) {
  const [_, displayPart] = line.trim().split(" | ");
  const curDigits = {};

  const dict = decodeDigits(line);

  const nums = displayPart.trim().split(" ");
  let curNum = "";
  for (let num of nums) {
    num = num.split("").sort().join("");
    const len = num.length;
    if (len in uniqueDigits) {
      uniqs++;
    }
    curNum += dict[num];
  }

  total += +curNum;
  digits.push(curDigits);
}

console.log(`The solution to the first part is: ${uniqs}`);
console.log(`The solution to the second part is: ${total}`);

/**
 * @param {string[]} digits
 * @returns {Record<string, number>}
 */
function decodeDigits(line) {
  const nums = line.split(" | ").shift().trim().split(" ");
  const digits = {};
  for (const num of nums) {
    const len = num.length;
    if (len in uniqueDigits) {
      const key = num.split("").sort().join("");
      digits[key] = len;
    }
  }

  const mapping = {};
  let oneSegments = [];
  let sevenSegments = [];
  let fourSegments = [];

  for (const [digit, len] of Object.entries(digits)) {
    switch (len) {
      case 2:
        oneSegments = digit.split("").sort();
        break;
      case 3:
        sevenSegments = digit.split("").sort();
        break;
      case 4:
        fourSegments = digit.split("").sort();
        break;
    }
  }

  mapping[oneSegments[0]] = "c";
  mapping[oneSegments[1]] = "f";
  let uniq = sevenSegments.filter((seg) => !oneSegments.includes(seg));
  mapping[uniq[0]] = "a";
  let three = [];
  let eight = [];
  for (const num of nums) {
    const segments = num.split("").sort();

    const unknown = segments.filter((seg) => !(seg in mapping));
    if (segments.length === 5 && unknown.length === 2) {
      three = segments;
    }
    if (segments.length === 7) {
      eight = segments;
    }
  }

  const unknownInThree = three.filter((seg) => !(seg in mapping));
  const unknownInFour = fourSegments.filter((seg) => !(seg in mapping));
  const d = unknownInThree.find((seg) => unknownInFour.includes(seg));
  const g = unknownInThree.find((seg) => !unknownInFour.includes(seg));
  const b = unknownInFour.find((seg) => !unknownInThree.includes(seg));
  mapping[d] = "d";
  mapping[g] = "g";
  mapping[b] = "b";
  const e = eight.find((seg) => !(seg in mapping));
  mapping[e] = "e";

  const dictionary = {};

  for (let num of nums) {
    num = num.split("").sort().join("");
    const key = num
      .split("")
      .map((seg) => mapping[seg])
      .sort()
      .join("");

    switch (key) {
      case "abcefg":
        dictionary[num] = 0;
        break;
      case "cf":
        dictionary[num] = 1;
        break;
      case "acdeg":
      case "adefg":
        dictionary[num] = 2;
        break;
      case "acdfg":
        dictionary[num] = 3;
        break;
      case "bcdf":
        dictionary[num] = 4;
        break;
      case "abdfg":
      case "abcdg":
        dictionary[num] = 5;
        break;
      case "abdefg":
      case "abcdeg":
        dictionary[num] = 6;
        break;
      case "acf":
        dictionary[num] = 7;
        break;
      case "abcdefg":
        dictionary[num] = 8;
        break;
      case "abcdfg":
        dictionary[num] = 9;
        break;
    }
  }

  return dictionary;
}
