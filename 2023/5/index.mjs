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
    almanac[src] = { dest, translations: {} };
    continue;
  }

  const nums = line
    .split(" ")
    .map(Number)
    .filter((num) => !isNaN(num));

  const [destStart, srcStart, range] = nums;
  const { src } = curTransform;
  almanac[src]["translations"][`${srcStart}-${srcStart + range - 1}`] =
    destStart - srcStart;
}

/**
 * @param {string} src
 * @param {string} dest
 * @param {number} org
 */
function traverseMap(src, dest, org) {
  while (src !== dest) {
    const { translations } = almanac[src];
    const ranges = Object.keys(translations).map((strRange) =>
      strRange.split("-").map((limit) => +limit),
    );
    for (let [lowerLimit, upperLimit] of ranges) {
      if (org >= lowerLimit && org <= upperLimit) {
        org += translations[`${lowerLimit}-${upperLimit}`];
        break;
      }
    }
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
