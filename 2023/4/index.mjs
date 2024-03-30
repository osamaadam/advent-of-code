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
  const cardId = idPart.split(" ")[1];
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

const cards = lines.map(parseCard);

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
