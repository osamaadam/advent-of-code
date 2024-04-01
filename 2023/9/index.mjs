import { parseInput } from "../util/parseInput.mjs";

const lines = await parseInput("input.txt");

const sequences = lines.map((line) =>
  line.split(" ").map((num) => parseInt(num, 10)),
);

/**
 * @param {number[]} sequence
 * @returns {number[]}
 */
function findNextAndPrevInSequence(sequence) {
  const sequences = [sequence];
  let curSequence = sequence;

  while (curSequence.some((num) => num !== 0)) {
    const nextSequence = [];

    for (let i = 1; i < curSequence.length; i++) {
      nextSequence.push(curSequence[i] - curSequence[i - 1]);
    }

    curSequence = nextSequence;
    sequences.push(curSequence);
  }

  for (let i = sequences.length - 1; i >= 0; i--) {
    if (sequences[i + 1]) {
      const curSequence = sequences[i];
      const nextSequence = sequences[i + 1];
      sequences[i].push(curSequence.at(-1) + nextSequence.at(-1));
      sequences[i].unshift(curSequence[0] - nextSequence[0]);
    } else {
      sequences[i].push(0);
      sequences[i].unshift(0);
    }
  }

  return sequences[0];
}

const newSequences = sequences.map((sequence) =>
  findNextAndPrevInSequence(sequence),
);

const partOneSolution = newSequences
  .map((sequence) => sequence.at(-1))
  .reduce((prev, cur) => prev + cur, 0);

console.log(`The solution to part one is: ${partOneSolution}`);

const partTwoSolution = newSequences
  .map((sequence) => sequence.at(0))
  .reduce((prev, cur) => prev + cur, 0);

console.log(`The solution to part two is: ${partTwoSolution}`);
