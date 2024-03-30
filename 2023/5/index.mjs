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

function parseRange(range) {
  const [lowerLimit, upperLimit] = range.split("-").map((limit) => +limit);

  return [lowerLimit, upperLimit];
}

function findIntersectionBetweenRanges(range1, range2) {
  const [lower1, upper1] = parseRange(range1);
  const [lower2, upper2] = parseRange(range2);
  const maxLower = Math.max(lower1, lower2);
  const leastUpper = Math.min(upper1, upper2);

  if (maxLower > leastUpper) {
    return null;
  }

  return `${maxLower}-${leastUpper}`;
}

function traverseMapRanges(src, dest, range) {
  const intersections = new Set([range]);
  while (src !== dest) {
    const curIntersections = [...intersections];
    const ranges = Object.keys(almanac[src].translations);

    for (let range of curIntersections) {
      for (let destRange of ranges) {
        const intersection =
          findIntersectionBetweenRanges(range, destRange) ?? range;
        const [lower, upper] = parseRange(intersection);
        const newLower = traverseMap(src, almanac[src].dest, lower);
        const newUpper = traverseMap(src, almanac[src].dest, upper);

        const newRange = `${Math.min(newLower, newUpper)}-${Math.max(newLower, newUpper)}`;
        console.log({ src, dest, newRange, intersection, range, destRange });
        intersections.delete(range);
        intersections.add(newRange);
      }
    }

    src = almanac[src].dest;
  }
  return [...intersections].sort((a, b) => {
    const [aLower, _] = parseRange(a);
    const [bLower, __] = parseRange(b);

    return aLower - bLower;
  });
}

const seedRanges = [];

for (let i = 0; i < seeds.length; i += 2) {
  seedRanges.push(`${seeds[i]}-${seeds[i] + seeds[i + 1] - 1}`);
}

console.log(traverseMapRanges("seed", "humidity", `79-82`));
