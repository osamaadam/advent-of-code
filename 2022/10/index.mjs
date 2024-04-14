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
let curRow = -1;
const crt = Array.from({ length: 6 }, () =>
  Array.from({ length: 40 }, () => "░"),
);

function renderCRT() {
  const spritePos = x - 1;
  const curCol = cycle % 40;
  if (curCol === 0) {
    curRow++;
  }

  if (curCol >= spritePos && curCol < spritePos + 3) {
    crt[curRow][curCol] = "█";
  }
}

function calculateSignalPower() {
  if ([20, 60, 100, 140, 180, 220].includes(cycle)) {
    signalPower += x * cycle;
  }
  renderCRT();
}

for (const { instr, arg } of instrs) {
  calculateSignalPower();
  switch (instr) {
    case "noop":
      cycle++;
      break;
    case "addx":
      cycle++;
      calculateSignalPower();
      cycle++;
      x += arg;
      break;
  }
}

console.log(`The solution to part one is: ${signalPower}`);
console.log(crt.map((row) => row.join("")).join("\n"));
