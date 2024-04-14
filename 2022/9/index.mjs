import { parseInput } from "../../2023/util/parseInput.mjs";

const lines = await parseInput("input.txt");

const instructions = lines.map((line) => {
  const [dir, rep] = line.split(" ");
  return [dir, Number(rep)];
});

const visitedCells = new Set(["0,0"]);

let hPos = [0, 0];
let tPos = [0, 0];

for (let [dir, rep] of instructions) {
  let move;
  switch (dir) {
    case "U":
      move = [0, -1];
      break;
    case "R":
      move = [1, 0];
      break;
    case "D":
      move = [0, 1];
      break;
    case "L":
      move = [-1, 0];
      break;
  }

  for (let i = 0; i < rep; i++) {
    moveHead(move);
    moveTail(move);
  }
}

/**
 * @param {number[]} move
 */
function moveHead(move) {
  const [r, c] = move;
  hPos = [hPos[0] + r, hPos[1] + c];
}

/**
 * @param {number[]} move
 */
function moveTail(move) {
  const [r, c] = move;
  const [hR, hC] = hPos;
  const [tR, tC] = tPos;
  if (Math.abs(hR - tR) <= 1 && Math.abs(hC - tC) <= 1) {
    return;
  }

  tPos = [hR - r, hC - c];
  visitedCells.add(`${tPos[0]},${tPos[1]}`);
}

console.log(`The solution to part one is: ${visitedCells.size}`);
