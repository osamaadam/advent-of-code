import { parseInput } from "../util/parseInput.mjs";

const lines = await parseInput("input.txt");

function parseGame(text) {
  let gameArr = [];
  const [idPart, cubesPart] = text.split(": ");
  const id = parseInt(idPart.split(" ")[1], 10);
  cubesPart.split("; ").forEach((round, roundNumber) => {
    const cubes = round.split(", ").map((cube) => cube.split(" "));
    gameArr.push(
      cubes.reduce(
        (acc, [numOfCubes, cubeColor]) => ({
          ...acc,
          [cubeColor]: parseInt(numOfCubes, 10),
        }),
        {},
      ),
    );
  });

  return {
    [id]: gameArr,
  };
}

const games = lines.map(parseGame);

const possibility = {
  red: 12,
  green: 13,
  blue: 14,
};

const possibleGames = games.filter((game) => {
  for (const round of Object.values(game)[0]) {
    for (const [color, numOfCubes] of Object.entries(possibility)) {
      if (round[color] > numOfCubes) {
        return false;
      }
    }
  }

  return true;
});

const result = possibleGames
  .map((game) => Object.keys(game))
  .flat()
  .map((id) => parseInt(id, 10))
  .reduce((acc, id) => acc + id, 0);

console.log(`The answer to part 1 is: ${result}`);

function findLeastNumberOfCubes(game) {
  const rounds = Object.values(game);

  const leastNumberOfCubes = {
    red: 0,
    green: 0,
    blue: 0,
  };

  rounds[0].forEach((round) => {
    leastNumberOfCubes.red = round.red
      ? Math.max(round.red, leastNumberOfCubes.red)
      : leastNumberOfCubes.red;

    leastNumberOfCubes.green = round.green
      ? Math.max(round.green, leastNumberOfCubes.green)
      : leastNumberOfCubes.green;

    leastNumberOfCubes.blue = round.blue
      ? Math.max(round.blue, leastNumberOfCubes.blue)
      : leastNumberOfCubes.blue;
  });

  return leastNumberOfCubes;
}

const partTwoResult = games
  .map((game) =>
    Object.values(findLeastNumberOfCubes(game))
      .filter((num) => num > 0)
      .reduce((acc, cur) => acc * cur, 1),
  )
  .reduce((acc, cur) => acc + cur, 0);

console.log(`The solution to part two is: ${partTwoResult}`);
