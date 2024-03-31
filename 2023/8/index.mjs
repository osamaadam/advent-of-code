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

// console.log(`The solution to part 1 is: ${findSteps("AAA", "ZZZ")}`);

iterator = 0;

function getLastLetter(node) {
  return node.split("").at(-1);
}

function findStepsAgain() {
  const startingNodes = Object.keys(map).filter(
    (node) => getLastLetter(node) === "A",
  );
  let steps = 0;

  while (!startingNodes.every((node) => getLastLetter(node) === "Z")) {
    const instr = next();

    for (let i in startingNodes) {
      switch (instr) {
        case "L":
          startingNodes[i] = map[startingNodes[i]].left;
          break;
        case "R":
          startingNodes[i] = map[startingNodes[i]].right;
          break;
      }
    }
    steps++;
  }

  return steps;
}

console.log(findStepsAgain());
