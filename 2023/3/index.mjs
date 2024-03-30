import { parseInput } from "../util/parseInput.mjs";

const lines = await parseInput("input.txt");
const matrix = lines.map((line) => line.split(""));

function getAdjacentCells(row, col) {
  return [
    [row + 1, col],
    [row - 1, col],
    [row, col + 1],
    [row, col - 1],
    [row + 1, col + 1],
    [row + 1, col - 1],
    [row - 1, col + 1],
    [row - 1, col - 1],
  ].filter(
    ([r, c]) => r >= 0 && r < matrix.length && c >= 0 && c < matrix.length,
  );
}

function isPartNumber(row, col) {
  const adjacentCells = getAdjacentCells(row, col);
  for (const [r, c] of adjacentCells) {
    const cell = matrix[r][c];
    if (isNaN(cell) && cell !== ".") {
      // Not a number and not a dot
      return true;
    }
  }

  return false;
}

function findPartNumbers() {
  const partNumbers = [];
  let curNumber = [];
  for (let row = 0; row < matrix.length; row++) {
    for (let col = 0; col <= matrix.length; col++) {
      if (isNaN(matrix[row][col]) || col === matrix.length) {
        if (curNumber.length > 0) {
          const isCurPartNumber = curNumber.reduce(
            (prev, cur) => prev || isPartNumber(cur[0], cur[1]),
            false,
          );
          if (isCurPartNumber) {
            partNumbers.push(curNumber);
          }
        }
        curNumber = [];
        continue;
      }
      curNumber.push([row, col]);
    }
  }

  return partNumbers;
}

function getPartNumber(positionalPartNumber) {
  return parseInt(
    positionalPartNumber.reduce(
      (prev, cur) => prev + matrix[cur[0]][cur[1]],
      "",
    ),
    10,
  );
}

const partNumbers = findPartNumbers();

const partOneResult = partNumbers
  .map(getPartNumber)
  .reduce((prev, cur) => prev + cur, 0);

console.log(`The answer to part 1 is: ${partOneResult}`);

function findGearRatio() {
  let ratio = 0;
  for (let row = 0; row < matrix.length; row++) {
    for (let col = 0; col < matrix.length; col++) {
      const cell = matrix[row][col];
      if (cell !== "*") {
        continue;
      }

      const adjacentCells = getAdjacentCells(row, col);
      const adjPosPartNumbers = [];
      for (const [r, c] of adjacentCells) {
        for (let posPN of partNumbers) {
          let foundPN = false;
          for (let posDigit of posPN) {
            if (posDigit[0] === r && posDigit[1] === c) {
              if (!adjPosPartNumbers.includes(posPN)) {
                adjPosPartNumbers.push(posPN);
              }
              foundPN = true;
              break;
            }
          }
          if (foundPN) {
            break;
          }
        }
      }
      if (adjPosPartNumbers.length === 2) {
        const adjPartNumbers = adjPosPartNumbers.map(getPartNumber);

        ratio += adjPartNumbers[0] * adjPartNumbers[1];
      }
    }
  }

  return ratio;
}

console.log(`The answer to part two is: ${findGearRatio()}`);
