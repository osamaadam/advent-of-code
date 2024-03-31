import { writeFileSync } from "fs";
import { parseInput } from "../util/parseInput.mjs";

const lines = await parseInput("input.txt");

/**
 * @typedef {Object} Play
 * @property {string} cards
 * @property {number} bid
 */

/**
 * @param {string[]} lines
 * @returns {Play[]}
 */
function parseLines(lines) {
  const plays = lines.map((line) => {
    const [cards, bid] = line.trim().split(" ");
    return {
      cards,
      bid,
    };
  });

  return plays;
}

const plays = parseLines(lines);

const RANKS_MAP = {
  HIGH_CARD: "HIGH_CARD",
  ONE_PAIR: "ONE_PAIR",
  TWO_PAIR: "TWO_PAIR",
  THREE_OF_KIND: "THREE_OF_KIND",
  FULL_HOUSE: "FULL_HOUSE",
  FOUR_OF_KIND: "FOUR_OF_KIND",
  FIVE_OF_KIND: "FIVE_OF_KIND",
};

const RANKS = Object.values(RANKS_MAP);

const CARDS = {
  A: 12,
  K: 11,
  Q: 10,
  J: 9,
  T: 8,
  9: 7,
  8: 6,
  7: 5,
  6: 4,
  5: 3,
  4: 2,
  3: 1,
  2: 0,
};

/**
 * @param {Play} play
 * @returns {string}
 */
function rankPlay(play) {
  const map = {};
  const { cards } = play;

  cards.split("").forEach((card) => {
    if (card in map) {
      map[card] += 1;
    } else {
      map[card] = 1;
    }
  });

  const nums = Object.values(map).sort((a, b) => b - a);

  switch (nums[0]) {
    case 5:
      return RANKS_MAP.FIVE_OF_KIND;
    case 4:
      return RANKS_MAP.FOUR_OF_KIND;
    case 3:
      if (nums[1] === 2) {
        return RANKS_MAP.FULL_HOUSE;
      }
      return RANKS_MAP.THREE_OF_KIND;
    case 2:
      if (nums[1] === 2) {
        return RANKS_MAP.TWO_PAIR;
      }
      return RANKS_MAP.ONE_PAIR;
    default:
      return RANKS_MAP.HIGH_CARD;
  }
}

plays.forEach((play) => {
  const rank = rankPlay(play);
  const { cards } = play;
  const weight = RANKS.findIndex((r) => r === rank);
});

/**
 * @param {Play} play1
 * @param {Play} play2
 *
 * @returns {Number}
 */
function sortPlays(play1, play2) {
  const rank1 = rankPlay(play1);
  const rank2 = rankPlay(play2);

  const weight1 = RANKS.findIndex((r) => r === rank1);
  const weight2 = RANKS.findIndex((r) => r === rank2);

  if (weight1 === weight2) {
    const cards1 = play1.cards.split("");
    const cards2 = play2.cards.split("");

    for (let i in cards1) {
      const card1Weight = CARDS[cards1[i]];
      const card2Weight = CARDS[cards2[i]];
      if (card1Weight !== card2Weight) {
        return card1Weight - card2Weight;
      }
    }
  }

  return weight1 - weight2;
}

const sortedPlays = plays.sort(sortPlays);

const partOneSolution = sortedPlays.reduce(
  (prev, cur, i) => prev + cur.bid * (i + 1),
  0,
);

console.log(`The solution to part one is: ${partOneSolution}`);
