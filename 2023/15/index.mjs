import { readFileSync } from "fs";

// const input = `
// rn=1,cm-,qp=3,cm=2,qp-,pc=4,ot=9,ab=5,pc-,pc=6,ot=7
// `.trim();

const input = readFileSync("./input.txt", "utf8").trim();

console.log(`Solution for part one: ${calculateHash(input)}`);

console.log(`Solution for part two: ${calculateFocusingPower(input)}`);

function calculateHash(input) {
  const segments = input.split(",");
  const segmentValues = segments.map((segment) => {
    return segment.split("").reduce((acc, curr) => {
      const currValue = curr.charCodeAt(0);
      acc += currValue;
      acc *= 17;
      return acc % 256;
    }, 0);
  });

  return segmentValues.reduce((acc, curr) => {
    return acc + curr;
  }, 0);
}

function placeBoxes(input) {
  const segments = input.split(",");
  const segmentsMap = segments.reduce((acc, curr, index) => {
    const key = curr.endsWith("-") ? curr.slice(0, -1) : curr.split("=")[0];
    const isRemoval = curr.endsWith("-");
    if (isRemoval) {
      delete acc[key];
      return acc;
    }
    const focalLength = parseInt(curr.split("=")[1], 10);

    acc[key] = {
      focalLength,
      index: acc[key] ? acc[key].index : index,
      box: calculateHash(key),
      key,
    };
    return acc;
  }, {});

  let lastIndex = -1;
  let lastBox = -1;

  const sortedSegments = Object.values(segmentsMap)
    .sort((a, b) => a.box - b.box || a.index - b.index)
    .map((segment) => {
      if (lastBox !== segment.box) {
        lastIndex = -1;
        lastBox = segment.box;
      }
      lastIndex++;
      return {
        ...segment,
        index: lastIndex,
      };
    });

  return sortedSegments;
}

function calculateFocusingPower(input) {
  const boxes = placeBoxes(input);

  const focusingPower = boxes.reduce((acc, curr) => {
    const keyFocusingPower =
      (curr.box + 1) * (curr.index + 1) * curr.focalLength;
    return acc + keyFocusingPower;
  }, 0);

  return focusingPower;
}
