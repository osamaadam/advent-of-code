import { readFileSync } from "fs";

// const input = `
// rn=1,cm-,qp=3,cm=2,qp-,pc=4,ot=9,ab=5,pc-,pc=6,ot=7
// `.trim();

const input = readFileSync("./input.txt", "utf8").trim();

console.log(calculatePartOne(input));

function calculatePartOne(input) {
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
