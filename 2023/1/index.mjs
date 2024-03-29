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

const alphaDigits = Object.keys(alphaDigitsMap);

function findAlphaDigits(line) {
  const indexMap = {};
  for (const alphaDigit of alphaDigits) {
    if (line.includes(alphaDigit)) {
      indexMap[alphaDigit] = line.indexOf(alphaDigit);
    }
  }

  return indexMap;
}

function convertAlphaDigits(line) {
  const indexMap = findAlphaDigits(line);
  const sortedAlphaDigits = Object.entries(indexMap)
    .map(([alphaDigit, index]) => ({
      alphaDigit,
      index,
    }))
    .sort((a, b) => a.index - b.index)
    .map(({ alphaDigit }) => alphaDigit);
  for (const alphaDigit of sortedAlphaDigits) {
    if (line.includes(alphaDigit)) {
      line = line.replace(alphaDigit, alphaDigitsMap[alphaDigit]);
    }
  }

  return line;
}

const convertedLines = lines
  .map(convertAlphaDigits)
  .filter((line) => line.length > 0);

const convertedDigitLines = convertedLines.map((line) =>
  line.split("").filter((c) => !isNaN(c)),
);

const convertedDigits = convertedDigitLines
  .map((line) => (line.length > 1 ? line : "0".concat(line)))
  .map((line) => parseInt(`${line[0]}${line[line.length - 1]}`, 10));

const convertedSum = convertedDigits.reduce((acc, digit) => acc + digit, 0);

console.log(`The answer to part 2 is: ${convertedSum}`);
