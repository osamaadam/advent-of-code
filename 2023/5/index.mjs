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

function findIntersection(range1, range2) {
  const [lower1, upper1] = parseRange(range1);
  const [lower2, upper2] = parseRange(range2);
  const maxLower = Math.max(lower1, lower2);
  const leastUpper = Math.min(upper1, upper2);

  if (maxLower >= leastUpper) {
    return null;
  }

  return `${maxLower}-${leastUpper}`;
}

function traverseMapRanges(src, dest, seedRanges) {
  while (src !== dest) {
    const next = [];

    while (seedRanges.length) {
      const curRange = seedRanges.pop();
      const [seedStart, seedEnd] = parseRange(curRange);
      const curDest = almanac[src];
      let didIntersect = false;
      for (let [interval, delta] of Object.entries(curDest.translations)) {
        const intersection = findIntersection(curRange, interval);
        if (intersection) {
          const [intStart, intEnd] = parseRange(intersection);
          const newRange = `${intStart + delta}-${intEnd + delta}`;
          next.push(newRange);
          if (intStart > seedStart) {
            seedRanges.push(`${seedStart}-${intStart - 1}`);
          }
          if (intEnd < seedEnd) {
            seedRanges.push(`${intEnd + 1}-${seedEnd}`);
          }
          didIntersect = true;
          break;
        }
      }
      if (!didIntersect) {
        next.push(curRange);
      }
    }

    seedRanges = next;
    src = almanac[src].dest;
  }

  return seedRanges.sort((a, b) => {
    const [startA, _] = parseRange(a);
    const [startB, __] = parseRange(b);

    return startA - startB;
  });
}

const seedRanges = [];

for (let i = 0; i < seeds.length; i += 2) {
  seedRanges.push(`${seeds[i]}-${seeds[i] + seeds[i + 1]}`);
}

const partTwoSolution = parseRange(
  traverseMapRanges("seed", "location", seedRanges)[0],
)[0];

console.log(`The solution to part two is: ${partTwoSolution}`);
