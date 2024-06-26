import { parseInput } from "../../2023/util/parseInput.mjs";

const lines = await parseInput("input.txt");
const roundScores = [];

const PLAYS = {
  ROCK: 1,
  PAPER: 2,
  SCISSORS: 3,
};

const MAP = {
  A: PLAYS.ROCK,
  B: PLAYS.PAPER,
  C: PLAYS.SCISSORS,

  X: PLAYS.ROCK,
  Y: PLAYS.PAPER,
  Z: PLAYS.SCISSORS,
};

/**
 * @param {string} opp
 * @param {string} me
 * @returns {number}
 */
function calculateRoundScore(opp, me) {
  switch (opp) {
    case "A":
      switch (me) {
        case "X":
          return 3 + MAP.X;
        case "Y":
          return 6 + MAP.Y;
        case "Z":
          return 0 + MAP.Z;
      }
    case "B":
      switch (me) {
        case "X":
          return 0 + MAP.X;
        case "Y":
          return 3 + MAP.Y;
        case "Z":
          return 6 + MAP.Z;
      }
    case "C":
      switch (me) {
        case "X":
          return 6 + MAP.X;
        case "Y":
          return 0 + MAP.Y;
        case "Z":
          return 3 + MAP.Z;
      }
  }
}

for (const line of lines) {
  const [opp, me] = line.split(" ");
  roundScores.push(calculateRoundScore(opp, me));
}

const totalScore = roundScores.reduce((prev, cur) => prev + cur, 0);

console.log(`The solution to the first part is: ${totalScore}`);

/**
 * @param {string} opp
 * @param {string} me
 * @returns {number}
 */
function calculateRoundScore2(opp, me) {
  switch (opp) {
    case "A":
      switch (me) {
        case "X":
          return 0 + MAP.C;
        case "Y":
          return 3 + MAP.A;
        case "Z":
          return 6 + MAP.B;
      }
    case "B":
      switch (me) {
        case "X":
          return 0 + MAP.A;
        case "Y":
          return 3 + MAP.B;
        case "Z":
          return 6 + MAP.C;
      }
    case "C":
      switch (me) {
        case "X":
          return 0 + MAP.B;
        case "Y":
          return 3 + MAP.C;
        case "Z":
          return 6 + MAP.A;
      }
  }
}

const secondRoundScores = [];

for (const line of lines) {
  const [opp, me] = line.split(" ");
  secondRoundScores.push(calculateRoundScore2(opp, me));
}

const secondTotalScore = secondRoundScores.reduce((prev, cur) => prev + cur, 0);

console.log(`The solution to the second part is: ${secondTotalScore}`);
