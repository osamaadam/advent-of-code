import { parseInput } from "../../2023/util/parseInput.mjs";

const lines = await parseInput("input.txt");

const instructions = lines.map((line) => {
  const [dir, rep] = line.split(" ");
  return [dir, Number(rep)];
});

function move(knots = 1) {
  const visitedCells = new Set(["0,0"]);

  const tailsPos = Array.from({ length: knots + 1 }, () => null).map(() => [
    0, 0,
  ]);

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
      moveHead(move, knots);
    }
  }

  /**
   * @param {number[]} move
   */
  function moveHead(move) {
    const [r, c] = move;
    const hPos = tailsPos[0];
    tailsPos[0] = [hPos[0] + r, hPos[1] + c];
    moveTail(1, hPos);
  }

  function moveTail(index) {
    if (index > knots) {
      return;
    }
    const [hR, hC] = tailsPos[index - 1];
    const [tR, tC] = tailsPos[index];
    const [dr, dc] = [hR - tR, hC - tC];
    if (Math.abs(dr) <= 1 && Math.abs(dc) <= 1) {
      return;
    }

    if (dr === 0) {
      tailsPos[index][1] += dc / 2;
    } else if (dc === 0) {
      tailsPos[index][0] += dr / 2;
    } else {
      tailsPos[index][0] += dr > 0 ? 1 : -1;
      tailsPos[index][1] += dc > 0 ? 1 : -1;
    }

    if (index === knots) {
      const tPos = tailsPos[index];
      visitedCells.add(`${tPos[0]},${tPos[1]}`);
    }
    moveTail(index + 1);
  }

  return visitedCells.size;
}

console.log(`The solution to part one is: ${move(1)}`);
console.log(`The solution to part two is: ${move(9)}`);
