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
