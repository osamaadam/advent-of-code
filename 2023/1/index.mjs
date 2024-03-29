import { readFile } from "fs/promises";

const input = (await readFile("input.txt", "utf8")).trim();

const lines = input.split("\n").map((line) => line.trim());

const digitLines = lines
  .map((line) => line.split("").filter((c) => !isNaN(c)))
  .filter((line) => line.length > 0);

const digits = digitLines.map((line) =>
  parseInt(`${line[0]}${line[line.length - 1]}`, 10),
);

const sum = digits.reduce((acc, digit) => acc + digit, 0);

console.log(`The answer to part 1 is: ${sum}`);

const alphaDigitsMap = {
  one: "1",
  two: "2",
  three: "3",
  four: "4",
  five: "5",
  six: "6",
  seven: "7",
  eight: "8",
  nine: "9",
};

function convertAlphaDigits(line) {
  let left = 0;
  let right = left;
  let curSlice = "";

  while (left < line.length) {
    if (!isNaN(line[left])) {
      left++;
      continue;
    }
    right = left + 2;
    while (right < line.length) {
      curSlice = line.slice(left, right + 1);
      if (curSlice in alphaDigitsMap) {
        const digit = alphaDigitsMap[curSlice];
        line = line.slice(0, left) + digit + line.slice(right);
      }
      right++;
    }
    left++;
  }

  return line;
}

const convertedLines = lines
  .map(convertAlphaDigits)
  .filter((line) => line.length > 0);

const convertedDigitLines = convertedLines.map((line) =>
  line.split("").filter((c) => !isNaN(c)),
);

const convertedDigits = convertedDigitLines.map((line) =>
  parseInt(`${line[0]}${line[line.length - 1]}`, 10),
);

const convertedSum = convertedDigits.reduce((acc, digit) => acc + digit, 0);

console.log(`The answer to part 2 is: ${convertedSum}`);
