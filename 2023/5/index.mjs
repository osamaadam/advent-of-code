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

function subractRanges(range1, range2) {
  const [lower1, upper1] = parseRange(range1);
  const [lower2, upper2] = parseRange(range2);

  let ranges = [];

  if (lower1 <= lower2) {
    if (upper1 < upper2) {
      ranges.push(`${lower1}-${lower2 - 1}`);
    }
    if (upper1 > upper2) {
      ranges.push(`${upper2 + 1}-${upper1}`);
    }
  } else if (lower1 >= lower2) {
    if (upper1 > upper2) {
      ranges.push(`${upper2 + 1}-${upper1}`);
    }
  }

  return ranges;
}

function traverseMapRanges(src, dest, ranges) {
  const rangeSet = new Set([...ranges]);

  while (src !== dest) {
    const { translations } = almanac[src];
    const curRanges = [...rangeSet];
    for (let range of curRanges) {
      for (let [destRange, val] of Object.entries(translations)) {
        const intersection = findIntersection(range, destRange);
        if (!intersection) {
          continue;
        }
        const oldRanges = subractRanges(range, destRange);
        const [lower, upper] = parseRange(intersection);
        const newRange = `${lower + val}-${upper + val}`;
        const newRanges = oldRanges
          .map((oldRange) => subractRanges(oldRange, newRange))
          .flat();
        newRanges.push(newRange);
        rangeSet.delete(range);
        newRanges.forEach((range) => {
          rangeSet.add(range);
        });
      }
    }

    src = almanac[src].dest;
  }

  return [...rangeSet].sort((a, b) => {
    const [lower1, _] = parseRange(a);
    const [lower2, __] = parseRange(b);

    return lower1 - lower2;
  });
}

const seedRanges = [];

for (let i = 0; i < seeds.length; i += 2) {
  seedRanges.push(`${seeds[i]}-${seeds[i] + seeds[i + 1] - 1}`);
}

console.log(traverseMapRanges("seed", "location", seedRanges));
