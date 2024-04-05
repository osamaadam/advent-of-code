import { parseInput } from "../util/parseInput.mjs";

const lines = await parseInput("input.txt");

let matricies = [];

let matrix = [];
for (const line of lines) {
  if (!line.trim().length) {
    matricies.push(matrix);
    matrix = [];
    continue;
  }
  matrix.push(line.trim().split(""));
}

matricies.push(matrix);

/**
 * @param {number[][]} matrix
 * @returns {number[][]}
 */
function transposeMatrix(matrix) {
  const transposedMatrix = Array.from({ length: matrix[0].length }, () =>
    Array.from({ length: matrix.length }, () => "x"),
  );

  for (let r = 0; r < matrix.length; r++) {
    for (let c = 0; c < matrix[r].length; c++) {
      transposedMatrix[c][r] = matrix[r][c];
    }
  }

  return transposedMatrix;
}

/**
 * @param {number[][]} matrix
 * @returns {number}
 */
function findMirrorIndex(matrix) {
  matrix = matrix.map((row) => row.join(""));

  outer: for (let i = 1; i < matrix.length; i++) {
    for (let j = 0; j < Math.min(i, matrix.length - i); j++) {
      if (matrix[i + j] !== matrix[i - j - 1]) {
        continue outer;
      }
    }
    return i;
  }

  return 0;
}

const partOneSolution = matricies
  .map((matrix) => {
    const mirrorIndex = findMirrorIndex(matrix);
    if (mirrorIndex === 0) {
      return findMirrorIndex(transposeMatrix(matrix));
    }

    return mirrorIndex * 100;
  })
  .reduce((prev, cur) => prev + cur, 0);

console.log(`The solution to part two is: ${partOneSolution}`);

/**
 * @param {number[][]} matrix
 * @returns {number}
 */
function findMirrorAndRepairSmudge(matrix) {
  matrix = matrix.map((row) => row.map((c) => (c === "." ? 1 : 0)));

  let farthestMirror = 0;
  rowLoop: for (let i = 1; i < matrix.length; i++) {
    let smudgesToRepair = 0;
    for (let j = 0; j < Math.min(matrix.length - i, i); j++) {
      for (let k = 0; k < matrix[i].length; k++) {
        smudgesToRepair += Math.abs(matrix[i + j][k] - matrix[i - j - 1][k]);
        if (smudgesToRepair > 1) {
          continue rowLoop;
        }
      }
    }
    farthestMirror = smudgesToRepair === 1 ? i : farthestMirror;
  }

  return farthestMirror;
}

const partTwoSolution = matricies
  .map((matrix) => {
    const result = findMirrorAndRepairSmudge(matrix);
    if (result === 0) {
      return findMirrorAndRepairSmudge(transposeMatrix(matrix));
    }

    return result * 100;
  })
  .reduce((prev, cur) => prev + cur, 0);

console.log(`The solution to part two is: ${partTwoSolution}`);
