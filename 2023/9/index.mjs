import { parseInput } from "../util/parseInput.mjs";

const lines = await parseInput("input.txt");

const sequences = lines.map((line) =>
  line.split(" ").map((num) => parseInt(num, 10)),
);

/**
 * @param {number[]} sequence
 * @returns number
 */
function findNextInSequenceBrute(sequence) {
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
    } else {
      sequences[i].push(0);
    }
  }

  return sequences[0].at(-1);
}

const partOneSolution = sequences
  .map((sequence) => findNextInSequenceBrute(sequence))
  .reduce((prev, cur) => prev + cur, 0);

console.log(`The solution to part one is: ${partOneSolution}`);
