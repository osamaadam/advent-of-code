import { parseInput } from "../../2023/util/parseInput.mjs";

const lines = await parseInput("input.txt");

const mostCommon = Array.from({ length: lines[0].length }, () => 0);

for (const line of lines) {
  for (let i = 0; i < line.length; i++) {
    const char = line[i];
    mostCommon[i] += char === "1" ? 1 : -1;
  }
}

const gamma = mostCommon.map((num) => (num > 0 ? 1 : 0)).join("");
const epsilon = mostCommon.map((num) => (num > 0 ? 0 : 1)).join("");

const result = parseInt(gamma, 2) * parseInt(epsilon, 2);

console.log(`The solution to the first part is: ${result}`);

let oxygenMask = "";
let co2Mask = "";
let finalOxy = null;
let finalCo2 = null;

for (let i = 0; i < lines[0].length; i++) {
  let common = 0;
  let least = 0;
  for (let j = 0; j < lines.length; j++) {
    if (i > 0 && lines[j].slice(0, oxygenMask.length) !== oxygenMask) {
      continue;
    }
    common += lines[j][i] === "1" ? 1 : -1;
    finalOxy = lines[j];
  }
  for (let j = 0; j < lines.length; j++) {
    if (i > 0 && lines[j].slice(0, co2Mask.length) !== co2Mask) {
      continue;
    }
    least += lines[j][i] === "1" ? 1 : -1;
    finalCo2 = lines[j];
  }
  if (common > 0) {
    oxygenMask += "1";
  } else if (common < 0) {
    oxygenMask += "0";
  } else {
    oxygenMask += "1";
  }

  if (least > 0) {
    co2Mask += "0";
  } else if (least < 0) {
    co2Mask += "1";
  } else {
    co2Mask += "0";
  }
}

console.log(
  `The solution to the second part is: ${parseInt(finalOxy, 2) * parseInt(finalCo2, 2)}`,
);
