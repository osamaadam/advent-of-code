import { parseInput } from "../util/parseInput.mjs";

const lines = await parseInput("input.txt");

const instructions = lines[0].trim().split("");

const map = {};

for (let line of lines.slice(2)) {
  const [node, directionsPart] = line.split(" = ");
  const [left, right] = directionsPart
    .replace("(", "")
    .replace(")", "")
    .split(", ")
    .map((direction) => direction.trim());

  map[node] = {
    left,
    right,
  };
}

let iterator = 0;

function next() {
  const nextIndex = iterator % instructions.length;
  iterator++;

  return instructions[nextIndex];
}

function findSteps(startingNode, destNode) {
  let steps = 0;
  while (startingNode !== destNode) {
    const instr = next();
    switch (instr) {
      case "L":
        startingNode = map[startingNode].left;
        break;
      case "R":
        startingNode = map[startingNode].right;
        break;
    }
    steps++;
  }

  return steps;
}

console.log(findSteps("AAA", "ZZZ"));
