import { readFile } from "fs/promises";

const input = (await readFile("input.txt", "utf8")).trim();

const lines = input.split("\n");

const digitLines = lines.map((line) => line.split("").filter((c) => !isNaN(c)));

const digits = digitLines.map((line) =>
  parseInt(`${line[0]}${line[line.length - 1]}`, 10),
);

const sum = digits.reduce((acc, digit) => acc + digit, 0);

console.log({
  digits,
  sum,
});
