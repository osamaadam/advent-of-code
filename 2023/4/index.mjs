import { parseInput } from "../util/parseInput.mjs";

const lines = await parseInput("input.txt");
/**
 * @typedef {Object} Card
 * @property {number} cardId
 * @property {number[]} winningNums
 * @property {number[]} numsYouHave
 */

/**
 * @param {string} line
 * @returns {Card}
 */
function parseCard(line) {
  const [idPart, numsPart] = line.split(": ");
  const cardId = parseInt(idPart.split(" ").at(-1).trim(), 10);
  const [winningPart, propertyPart] = numsPart.split(" | ");
  const winningNums = winningPart
    .split(" ")
    .map((num) => parseInt(num.trim(), 10))
    .filter((num) => !isNaN(num));
  const numsYouHave = propertyPart
    .split(" ")
    .map((num) => parseInt(num.trim(), 10))
    .filter((num) => !isNaN(num));

  return {
    cardId,
    numsYouHave,
    winningNums,
  };
}

let cards = lines.map(parseCard);

/** @param {Card} card */
function calculateCardValue(card) {
  const winningNumsYouHave = card.winningNums.filter((num) =>
    card.numsYouHave.includes(num),
  );

  if (!winningNumsYouHave.length) {
    return 0;
  }

  return winningNumsYouHave.reduce((prev) => (prev > 0 ? prev * 2 : 1), 0);
}

const cardValues = cards.map(calculateCardValue);
const totalCardValues = cardValues.reduce((prev, cur) => prev + cur, 0);

console.log(`The solution for part one is: ${totalCardValues}`);

function calculateWinnings(card) {
  return card.winningNums.filter((num) => card.numsYouHave.includes(num))
    .length;
}

const cardsMap = cards.reduce(
  (prev, cur) => ({ ...prev, [cur.cardId]: 1 }),
  {},
);

for (let card of cards) {
  let winnings = calculateWinnings(card);
  const nextCardIndexes = Object.keys(cardsMap)
    .filter((cardId) => +cardId > +card.cardId)
    .sort((a, b) => a - b);

  let curInstances = cardsMap[card.cardId];
  for (let nextIndex of nextCardIndexes) {
    if (winnings <= 0) {
      break;
    }
    cardsMap[nextIndex] += curInstances;
    winnings--;
  }
}

const cardsCount = Object.values(cardsMap).reduce((prev, cur) => prev + cur, 0);

console.log(`The solution to part 2 is: ${cardsCount}`);
