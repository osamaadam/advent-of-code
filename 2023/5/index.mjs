import { parseInput } from "../util/parseInput.mjs";

const lines = await parseInput("input.txt");
const seeds = lines[0]
  .split(": ")[1]
  .split(" ")
  .map((block) => Number(block))
  .filter((seed) => !isNaN(seed));

const almanac = {};

let curTransform = null;
for (let line of lines.slice(1)) {
  line = line.trim();
  if (!line.length) {
    curTransform = null;
    continue;
  }
  if (curTransform === null) {
    const curTransformText = line.split(" ")[0];
    const [src, _, dest] = curTransformText.split("-");
    curTransform = { src, dest };
    almanac[src] = { dest };
    continue;
  }

  const nums = line
    .split(" ")
    .map(Number)
    .filter((num) => !isNaN(num));

  const [destStart, srcStart, range] = nums;
  const { src } = curTransform;
  for (let i = 0; i < range; i++) {
    almanac[src][srcStart + i] = destStart + i;
  }
}

/**
 * @param {string} src
 * @param {string} dest
 * @param {number} org
 */
function traverseMap(src, dest, org) {
  while (src !== dest) {
    org = almanac[src][org] ?? org;
    src = almanac[src].dest;
  }

  return org;
}

const finalLocations = seeds.map((seed) =>
  traverseMap("seed", "location", seed),
);

const lowestLocation = finalLocations.reduce(
  (prev, cur) => Math.min(prev, cur),
  Infinity,
);

console.log(`The solution to part 1 is: ${lowestLocation}`);
