import { readFile } from "fs/promises";

const lines = (await readFile("input.txt")).toString().split("\n");
/** @type {string[]} */
let stacks = [];
let instStart = 0;

for (const [i, line] of lines.entries()) {
  if (line.trim() === "") {
    instStart = i + 1;
    break;
  }

  let j = 0;
  for (let i = 1; i < line.length; i += 4) {
    if (!stacks[j]) {
      stacks[j] = [];
    }
    if (line[i].trim() && isNaN(line[i])) {
      stacks[j].unshift(line[i]);
    }
    j++;
  }
}

/**
 * @type {{
 *  num: number
 *  from: number;
 *  to: number;
 * }[]}
 */
const instructions = [];

for (let i = instStart; i < lines.length; i++) {
  if (lines[i].trim() === "") {
    break;
  }
  const line = lines[i];
  const segments = line.split(" ");
  instructions.push({
    num: +segments[1],
    from: +segments[3] - 1,
    to: +segments[5] - 1,
  });
}

const orgStacks = [...stacks.map((stack) => [...stack])];

for (const instr of instructions) {
  const { num, from, to } = instr;
  for (let i = 0; i < num; i++) {
    stacks[to].push(stacks[from].pop());
  }
}

const word = stacks.reduce((prev, cur) => prev + cur.at(-1), "");

console.log(`The solution to part one is: ${word}`);

for (const instr of instructions) {
  const { num, from, to } = instr;

  orgStacks[to].push(...orgStacks[from].slice(-num));
  orgStacks[from] = orgStacks[from].slice(0, -num);
}

const newWord = orgStacks.reduce((prev, cur) => prev + cur.at(-1), "");

console.log(`The solution to part two is: ${newWord}`);
