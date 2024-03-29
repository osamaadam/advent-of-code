import { readFile } from "fs/promises";

/**
 * @param {string} inputPath
 *
 * @returns {Promise<string[]>}
 */
export async function parseInput(inputPath) {
  const fileContent = (await readFile(inputPath, "utf-8")).trim();

  return fileContent.split("\n").map((line) => line.trim());
}
