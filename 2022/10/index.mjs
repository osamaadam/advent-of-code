import { parseInput } from "../../2023/util/parseInput.mjs";

const lines = await parseInput("input.txt");
const instrs = lines.map((line) => {
  const [instr, arg] = line.split(" ");
  return {
    instr,
    arg: arg ? Number(arg) : null,
  };
});

let cycle = 0;
let x = 1;
let signalPower = 0;
const processedSet = new Set();

function calculateSignalPower() {
  if (
    [20, 60, 100, 140, 180, 220].includes(cycle) &&
    !processedSet.has(cycle)
  ) {
    signalPower += x * cycle;
    processedSet.add(cycle);
  }
}

for (const { instr, arg } of instrs) {
  switch (instr) {
    case "noop":
      cycle++;
      break;
    case "addx":
      cycle++;
      calculateSignalPower();
      cycle++;
      calculateSignalPower();
      x += arg;
      break;
  }
  calculateSignalPower();
}

console.log(`The solution to part one is: ${signalPower}`);
