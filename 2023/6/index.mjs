import { parseInput } from "../util/parseInput.mjs";

const lines = await parseInput("input.txt");
function parseLine(line) {
  return line
    .split(": ")[1]
    .trim()
    .split(" ")
    .map((segment) => segment.trim())
    .filter((segment) => segment.length)
    .map((segment) => parseInt(segment, 10));
}

const times = parseLine(lines[0]);
const distances = parseLine(lines[1]);

function findWaysToWin(gameTime, gameDistance) {
  let waysToWin = 0;

  for (let chargingTime = 1; chargingTime < gameTime - 1; chargingTime++) {
    const timeLeft = gameTime - chargingTime;
    const distance = chargingTime * timeLeft;

    if (distance > gameDistance) {
      waysToWin++;
    }
  }

  return waysToWin;
}

const waysToWinEach = Array.from(Array(times.length)).map((_, gameIndex) =>
  findWaysToWin(times[gameIndex], distances[gameIndex]),
);

const partOneSolution = waysToWinEach.reduce((prev, cur) => prev * cur, 1);

console.log(`The solution to part one is: ${partOneSolution}`);

const time = times.map((t) => String(t)).join("");
const distance = distances.map((d) => String(d)).join("");

const partTwoSolution = findWaysToWin(time, distance);

console.log(`The solution to part 2 is: ${partTwoSolution}`);
